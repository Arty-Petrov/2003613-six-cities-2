import {readFileSync} from 'fs';
import {Offer} from '../../types/offer.type.js';
import {FileReaderInterface} from './file-reader.interface.js';
import {LoggingType} from '../../const/logging-type.enum.js';
import {Features} from '../../const/features.enum.js';
import {City} from '../../const/city.enum.js';

export default class TSVFileReader implements FileReaderInterface {
  private rawData = '';

  constructor(public filename: string) {}

  public read(): void {
    this.rawData = readFileSync(this.filename, { encoding: 'utf8' });
  }

  public toArray(): Offer[] {
    if (!this.rawData) {
      return [];
    }

    return this.rawData
      .split('\n')
      .filter((row) => row.trim() !== '')
      .map((line) => line.split('\t'))
      .map(([
        title,
        description,
        createdDate,
        cityName,
        preview,
        photos,
        premium,
        favorite,
        rating,
        type,
        rooms,
        guests,
        price,
        features,
        name,
        email,
        avatarPath,
        password,
        isPro,
        commentsCount,
        latitude,
        longitude,
      ]) => ({
        title,
        description,
        postDate: new Date(createdDate),
        city: City[cityName as keyof typeof City],
        preview,
        photos: photos.split(';').map((fileName) => fileName),
        isPremium: !!premium,
        isFavorite: !!favorite,
        rating: Number.parseInt(rating, 10),
        type: LoggingType[type as keyof typeof LoggingType],
        roomsCount: Number.parseInt(rooms, 10),
        guestsCount: Number.parseInt(guests, 10),
        price: Number.parseInt(price, 10),
        features: features.split(';').map((feature) => Features[feature as keyof typeof Features]),
        author: {
          name,
          email,
          avatarPath,
          password,
          isPro: !!isPro
        },
        commentsCount: Number.parseInt(commentsCount, 10),
        address: {
          latitude: Number.parseFloat(latitude),
          longitude: Number.parseFloat(longitude)
        }
      }));
  }
}
