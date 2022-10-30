import { ClassConstructor, plainToInstance } from 'class-transformer';
import * as crypto from 'crypto';
import * as jose from 'jose';
import { City } from '../types/city.enum.js';
import { Features } from '../types/features.enum.js';
import { OfferType } from '../types/offer-type.enum.js';
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
    description: description,
    postDate: new Date(postDate),
    city: city as City,
    preview,
    photos: photos.split(';'),
    isPremium: !!isPremium,
    isFavorite: !!isFavorite,
    rating: Number.parseFloat(rating),
    offerType: type as OfferType,
    roomsCount: Number.parseInt(roomsCount,10),
    guestsCount: Number.parseInt(guestsCount,10),
    price: Number.parseInt(price,10),
    features: features.split(';').map((feature) => feature as Features),
    host: {
      name: name,
      email: email,
      avatarUrl: avatarPath,
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

export const createSHA256 = (line: string, salt: string): string => {
  const shaHasher = crypto.createHmac('sha256', salt);
  return shaHasher.update(line).digest('hex');
};

export const fillDTO = <T, V>(someDto: ClassConstructor<T>, plainObject: V) =>
  plainToInstance(someDto, plainObject, {excludeExtraneousValues: true});

export const createErrorObject = (message: string) => ({
  error: message,
});

export const createJWT = async (algoritm: string, jwtSecret: string, payload: object): Promise<string> =>
  new jose.SignJWT({...payload})
    .setProtectedHeader({ alg: algoritm})
    .setIssuedAt()
    .setExpirationTime('2d')
    .sign(crypto.createSecretKey(jwtSecret, 'utf-8'));

