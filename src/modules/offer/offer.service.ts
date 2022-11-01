import { DocumentType, types } from '@typegoose/typegoose';
import { inject, injectable } from 'inversify';
import { LoggerInterface } from '../../common/logger/logger.interface.js';
import { OffersListCount, PremiumOffersListCount } from '../../const/index.js';
import { Component } from '../../types/component.types.js';
import { SortType } from '../../types/sort-type.enum.js';
import CreateOfferDto from './dto/create-offer.dto.js';
import UpdateOfferDto from './dto/update-offer.dto.js';
import { OfferServiceInterface } from './offer-service.interface.js';
import { OfferEntity } from './offer.entity.js';


@injectable()
export default class OfferService implements OfferServiceInterface {
  constructor(
    @inject(Component.LoggerInterface) private readonly logger: LoggerInterface,
    @inject(Component.OfferModel) private readonly offerModel: types.ModelType<OfferEntity>
  ) {}

  public async create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity | null>> {
    this.logger.info(`${dto.cityId}`);
    const offer = await this.offerModel.create(dto);
    this.logger.info(`New offer created: ${dto.title}`);
    return offer;
  }

  public async updateById(offerId: string, dto: UpdateOfferDto): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, dto, { new: true })
      .populate(['userId', 'features', 'cityId'])
      .exec();
  }

  public async deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    const deletedOffer = await this.offerModel.findByIdAndDelete(offerId).exec();
    this.logger.info(`Offer ${offerId} and its comments are deleted`);
    return deletedOffer;
  }

  public async addToFavorites(offerId: string, userId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId,
        {
          $addToSet: {inFavorites: userId,}
        })
      .populate(['userId', 'features', 'cityId'])
      .exec();
  }

  public async removeFromFavorites(offerId: string, userId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId,
        {
          $pull: {inFavorites: userId,}
        })
      .populate(['userId', 'features', 'cityId'])
      .exec();
  }

  public async find(limit: number): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel
      .find()
      .limit(limit || OffersListCount.Default)
      .sort({postDate: SortType.Down})
      .populate(['userId', 'features', 'cityId'])
      .exec();
  }

  public async show(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findById(offerId)
      .populate(['userId', 'features', 'cityId'])
      .exec();
  }

  public async findPremiums(cityId: string): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel
      .find({cityId: cityId})
      .sort({postDate: SortType.Down})
      .limit(PremiumOffersListCount.Strict)
      .populate(['userId', 'features', 'cityId'])
      .exec();
  }

  public async findFavorites(favorites: string[]): Promise<DocumentType<OfferEntity>[]> {
    if (favorites.length) {
      return this.offerModel
        .find({_id: {$in: favorites}})
        .exec();
    }
    return [];
  }

  public async updateCommentsCountAndRating(
    offerId: string,
    rating: number,
    commentsCount: number
  ): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId,
        {
          '$set': {
            commentsCount: commentsCount,
            rating: rating
          },
        },
        {new: true});
  }

  public async exists(offerId: string): Promise<boolean> {
    return (await this.offerModel
      .exists({_id: offerId})) !== null;
  }
}
