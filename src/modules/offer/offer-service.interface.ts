import { DocumentType } from '@typegoose/typegoose';
import { City } from '../../const/city.enum.js';
import CreateOfferDto from './dto/create-offer.dto.js';
import UpdateOfferDto from './dto/update-offer.dto.js';
import { OfferEntity } from './offer.entity.js';

export interface OfferServiceInterface {
  create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity | null>>;
  update(offerId: string, dto: UpdateOfferDto): Promise<DocumentType<OfferEntity> | null>;
  delete(offerId: string): Promise<void>;
  addToFavorites(offerId: string, userId: string): Promise<DocumentType<OfferEntity> | null>
  removeFromFavorites(offerId: string, userId: string): Promise<DocumentType<OfferEntity> | null>
  find(): Promise<DocumentType<OfferEntity>[]>;
  findById(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  findPremiumByCity(city: City): Promise<DocumentType<OfferEntity>[]>;
  updateCommentsCountAndRating(offerId: string, ratingsSum: number): Promise<DocumentType<OfferEntity> | null>;
  exists(documentId: string): Promise<boolean>;
}
