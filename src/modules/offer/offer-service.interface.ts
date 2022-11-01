import { DocumentType } from '@typegoose/typegoose';
import { DocumentExistsInterface } from '../../types/document-exist.interface.js';
import CreateOfferDto from './dto/create-offer.dto.js';
import UpdateOfferDto from './dto/update-offer.dto.js';
import { OfferEntity } from './offer.entity.js';

export interface OfferServiceInterface extends DocumentExistsInterface{
  find(limit: number): Promise<DocumentType<OfferEntity>[]>;
  show(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  exists(offerId: string): Promise<boolean>;
  create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity | null>>;
  updateById(offerId: string, dto: UpdateOfferDto): Promise<DocumentType<OfferEntity> | null>;
  deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  addToFavorites(offerId: string, userId: string): Promise<DocumentType<OfferEntity> | null>
  removeFromFavorites(offerId: string, userId: string): Promise<DocumentType<OfferEntity> | null>
  findPremiums(cityId: string): Promise<DocumentType<OfferEntity>[]>;
  findFavorites(favorites: string[]): Promise<DocumentType<OfferEntity>[]>;
  updateCommentsCountAndRating(offerId: string, rating: number, commentsCount: number): Promise<DocumentType<OfferEntity> | null>;
}
