import { DocumentType } from '@typegoose/typegoose';
import CreateOfferDto from './dto/create-offer.dto.js';
import UpdateOfferDto from './dto/update-offer.dto.js';
import { OfferEntity } from './offer.entity.js';

export interface OfferServiceInterface {
  create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity | null>>;
  updateById(offerId: string, dto: UpdateOfferDto): Promise<DocumentType<OfferEntity> | null>;
  deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  addToFavorites(offerId: string, userId: string): Promise<DocumentType<OfferEntity> | null>
  removeFromFavorites(offerId: string, userId: string): Promise<DocumentType<OfferEntity> | null>
  find(limit: number): Promise<DocumentType<OfferEntity>[]>;
  findById(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  findPremiumByCityId(cityId: string, limit: number): Promise<DocumentType<OfferEntity>[]>;
  updateCommentsCountAndRating(offerId: string, ratingsSum: number): Promise<DocumentType<OfferEntity> | null>;
  exists(documentId: string): Promise<boolean>;
}
