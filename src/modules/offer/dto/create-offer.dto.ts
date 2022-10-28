import { Address } from '../../../types/address.type.js';
import { OfferType } from '../../../types/offer-type.enum.js';

export default class CreateOfferDto {
  public title!: string;
  public description!: string;
  public postDate!: Date;
  public cityId!: string;
  public preview!: string;
  public photos!: string[];
  public isPremium!: boolean;
  public offerType!: OfferType;
  public roomsCount!: number;
  public guestsCount!: number;
  public price!: number;
  public features!: string[];
  public userId!: string;
  public address!: Address;
}
