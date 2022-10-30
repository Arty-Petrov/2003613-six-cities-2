import { DocumentType, types } from '@typegoose/typegoose';
import { inject, injectable } from 'inversify';
import mongoose from 'mongoose';
import { LoggerInterface } from '../../common/logger/logger.interface.js';
import { Component } from '../../types/component.types.js';
import { SortType } from '../../types/sort-type.enum.js';
import { CommentServiceInterface } from './comment-service.interface.js';
import { DEFAULT_COMMENTS_COUNT } from './comment.const.js';
import { CommentEntity } from './comment.entity.js';
import CreateCommentDto from './dto/create-comment.dto.js';


type OfferRatingUpdate = {
  offerRating: number,
  commentsCount: number
}

@injectable()
export default class CommentService implements CommentServiceInterface {
  constructor(
    @inject(Component.LoggerInterface) private  readonly logger: LoggerInterface,
    @inject(Component.CommentModel) private readonly commentModel: types.ModelType<CommentEntity>,
  ) {}

  public async calcRatingsByOfferId(offerId: string): Promise<OfferRatingUpdate> {
    const id = new mongoose.Types.ObjectId(offerId);
    const offerRatingUpdate =
      await this.commentModel
        .aggregate([
          {$match: {
            offerId: {$eq: id}
          }},
          {$group: {
            _id: null,
            ratingSum: {'$sum': '$rating'},
            count: {'$sum': 1},
          }},
        ])
        .exec();
    console.log(`${offerRatingUpdate[0].ratingSum}  ${offerRatingUpdate[0].count}`);
    return {
      offerRating : offerRatingUpdate[0].ratingSum / offerRatingUpdate[0].count,
      commentsCount: offerRatingUpdate[0].count,
    };
  }

  public async create(dto: CreateCommentDto): Promise<DocumentType<CommentEntity> | null> {
    const comment = await this.commentModel.create(dto);
    this.logger.info('New comment was created');
    return comment.populate(['userId']);
  }

  public async deleteAllByOfferId(offerId: string): Promise<void>{
    this.commentModel
      .deleteMany({offerId})
      .exec();
    this.logger.info(`Comments of offer with id ${offerId} was deleted`);
  }

  public async findByOfferId(offerId: string): Promise<DocumentType<CommentEntity>[] | null> {
    return this.commentModel
      .find({offerId: offerId})
      .limit(DEFAULT_COMMENTS_COUNT)
      .sort({postDate: SortType.Down})
      .populate(['userId'])
      .exec();
  }
}
