import { City } from '../../../const/city.enum.js';
import { OfferType } from '../../../const/offer-type.enum.js';
import { Address } from '../../../types/address.type.js';

export default class CreateOfferDto {
  public title!: string;
  public description!: string;
  public postDate!: Date;
  public city!: City;
  public preview!: string;
  public photos!: string[];
  public isPremium!: boolean;
  public isFavorite!: boolean;
  public rating!: number;
  public type!: OfferType;
  public roomsCount!: number;
  public guestsCount!: number;
  public price!: number;
  public features!: string[];
  public userId!: string;
  public commentsCount!: number;
  public address!: Address;
}
