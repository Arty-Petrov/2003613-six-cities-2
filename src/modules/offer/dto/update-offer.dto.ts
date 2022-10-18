import { City } from '../../../const/city.enum.js';
import { OfferType } from '../../../const/offer-type.enum.js';
import { Address } from '../../../types/address.type.js';

export default class UpdateOfferDto {
  public title!: string;
  public offerDescription!: string;
  public postDate!: Date;
  public city!: City;
  public preview!: string;
  public photos!: string[];
  public isPremium!: boolean;
  public isFavorite!: boolean;
  public rating!: number;
  public offerType!: OfferType;
  public roomsCount!: number;
  public guestsCount!: number;
  public price!: number;
  public features!: string[];
  public userId!: string;
  public address!: Address;
}
