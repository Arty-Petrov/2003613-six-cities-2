import {City} from '../const/city.enum.js';
import {Features} from '../const/features.enum.js';
import {LoggingType} from '../const/logging-type.enum.js';
import { Offer } from '../types/offer.type.js';

export const createOffer = (row: string) => {
  const tokens = row.replace('\n', '').split('\t');
  const [title, description, postDate, city,
    preview, photos, isPremium, isFavorite,
    rating, type, roomsCount, guestsCount, price,
    features, name, email, avatarPath,
    password, isPro, commentsCount, latitude,
    longitude] = tokens;
  return {
    title,
    description,
    postDate: new Date(postDate),
    city: city as City,
    preview,
    photos: photos.split(';'),
    isPremium: !!isPremium,
    isFavorite: !!isFavorite,
    rating: Number.parseFloat(rating),
    type: type as LoggingType,
    roomsCount: Number.parseInt(roomsCount,10),
    guestsCount: Number.parseInt(guestsCount,10),
    price: Number.parseInt(price,10),
    features: features.split(';').map((feature) => feature as Features),
    author: {
      name: name,
      email: email,
      avatarPath: avatarPath,
      password: password,
      isPro: !!isPro
    },
    commentsCount: Number.parseInt(commentsCount,10),
    address: {
      latitude: Number.parseFloat(latitude),
      longitude: Number.parseFloat(longitude)
    },
  } as Offer;
};

export const getErrorMessage = (error: unknown): string =>
  error instanceof Error ? error.message : '';
