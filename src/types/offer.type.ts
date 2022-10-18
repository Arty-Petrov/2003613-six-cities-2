import { City } from '../const/city.enum.js';
import { Features } from '../const/features.enum.js';
import { OfferType } from '../const/offer-type.enum.js';
import { Address } from './address.type.js';
import { User } from './user.type.js';


export type Offer = {
  title: string;
  offerDescription: string;
  postDate: Date;
  city: City;
  preview: string;
  photos: string[]; //Список ссылок на фотографии жилья. Всегда 6 фотографий;
  isPremium: boolean;
  isFavorite: boolean;
  rating: number; //Обязательное. Число от 1 до 5. Допускаются числа с запятой (1 знак после запятой);
  offerType: OfferType;
  roomsCount: number;
  guestsCount: number;
  price: number;
  features: Features[];
  host: User;
  commentsCount: number;
  address: Address;
}
