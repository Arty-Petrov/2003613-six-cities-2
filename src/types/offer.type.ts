import { City } from '../const/city.enum.js';
import { Features } from '../const/features.enum.js';
import { OfferType } from '../const/offer-type.enum.js';
import { Address } from './address.type.js';
import { User } from './user.type.js';


export type Offer = {
  title: string; //Обязательное. Мин. длин 10 символов, макс. длина 100;
  description: string; //Обязательное. Мин. длина 20 символов, макс. длина 1024 символа;
  postDate: Date; //Обязательное;
  city: City; //Обязательное. Один из шести городов;
  preview: string; //Обязательное. Ссылка на изображение, которое используется в качестве превью;
  photos: string[]; //Список ссылок на фотографии жилья. Всегда 6 фотографий;
  isPremium: boolean;// Обязательное. Признак премиальности предложения;
  isFavorite: boolean; //Обязательное. Признак того, что предложение принадлежит списку избранных предложений пользователя;
  rating: number; //Обязательное. Число от 1 до 5. Допускаются числа с запятой (1 знак после запятой);
  type: OfferType; //Обязательное. Один из вариантов: `apartment`,`house`, `room`, `hotel`;
  roomsCount: number; //Обязательное. Мин. 1, Макс. 8;
  guestsCount: number; //Обязательное. Мин. 1, Макс. 10;
  price: number; //Обязательное. Мин. 100, Макс. 100 000;
  features: Features[]; //Список удобств. Один или несколько вариантов из списка: `Breakfast`, `Air conditioning`, `Laptop friendly workspace`, `Baby seat`, `Washer`, `Towels`, `Fridge`;
  author: User; //Обязательное. Ссылка на сущность «Пользователь»;
  commentsCount: number; //Рассчитывается автоматически;
  address: Address;//Обязательное. Координаты представлены широтой и долготой.
}
