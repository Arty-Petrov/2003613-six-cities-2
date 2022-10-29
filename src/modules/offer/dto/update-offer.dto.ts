import { Address } from '../../../types/address.type.js';

export default class UpdateOfferDto {
  public title?: string;
  public description?: string;
  public postDate?: Date;
  public cityId?: string;
  public preview?: string;
  public photos?: string[];
  public isPremium?: boolean;
  public isFavorite?: boolean;
  public rating?: number;
  public offerType?: string;
  public roomsCount?: number;
  public guestsCount?: number;
  public price?: number;
  public features?: string[];
  public userId?: string;
  public address?: Address;
}
