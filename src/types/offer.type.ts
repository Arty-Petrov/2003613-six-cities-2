import { City } from './city.enum.js';
import { Features } from './features.enum.js';
import { OfferType } from './offer-type.enum.js';
import { Address } from './address.type.js';
import { User } from './user.type.js';


export type Offer = {
  title: string;
  description: string;
  postDate: Date;
  city: City;
  preview: string;
  photos: string[];
  isPremium: boolean;
  rating: number;
  offerType: OfferType;
  roomsCount: number;
  guestsCount: number;
  price: number;
  features: Features[];
  host: User;
  commentsCount: number;
  address: Address;
}
