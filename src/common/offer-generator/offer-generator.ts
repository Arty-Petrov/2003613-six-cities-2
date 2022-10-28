import {City} from '../../types/city.enum.js';
import {Features} from '../../types/features.enum.js';
import {OfferType} from '../../types/offer-type.enum.js';
import {MockData} from '../../types/mock-data.type.js';
import {
  generateRandomValue,
  generateRandomDate,
  getRandomItem,
  getRandomItems, generatePassword,
} from '../../utils/random.js';
import {OfferGeneratorInterface} from './offer-generator.interface.js';

const MIN_PRICE = 100;
const MAX_PRICE = 100000;
const MIN_GUESTS = 1;
const MAX_GUESTS = 10;
const MIN_ROOMS = 1;
const MAX_ROOMS = 8;
const MIN_RATING = 1;
const MAX_RATING = 5;
const RATING_ACCURACY = 1;
const MIN_DATE = '20220801';
const MAX_DATE = '20220901';
const MIN_LAT = 39;
const MAX_LAT = 43;
const MIN_LNG = 139;
const MAX_LNG = 143;
const LAT_LNG_ACCURACY = 6;
const MIN_COMMENTS = 0;
const MAX_COMMENTS = 10;

export default class OfferGenerator implements OfferGeneratorInterface {
  constructor(private readonly mockData: MockData) {}

  public generate(): string {
    const title = getRandomItem<string>(this.mockData.titles);
    const description = getRandomItem<string>(this.mockData.descriptions);
    const postDate = generateRandomDate(MIN_DATE, MAX_DATE);
    const city = getRandomItem<string>(Array.from(Object.values(City)));
    const preview = getRandomItem<string>(this.mockData.photos);
    const photos = getRandomItems<string>(this.mockData.photos);
    const isPremium = !!generateRandomValue(0,1);
    const isFavorite = !!generateRandomValue(0,1);
    const rating = generateRandomValue(MIN_RATING, MAX_RATING, RATING_ACCURACY).toString();
    const type = getRandomItem<string>(Array.from(Object.values(OfferType)));
    const roomsCount = generateRandomValue(MIN_ROOMS, MAX_ROOMS).toString();
    const guestsCount = generateRandomValue(MIN_GUESTS, MAX_GUESTS).toString();
    const price = generateRandomValue(MIN_PRICE, MAX_PRICE).toString();
    const features = getRandomItems<string>(Array.from(Object.values(Features)));
    const name = getRandomItem<string>(this.mockData.userNames);
    const email = getRandomItem<string>(this.mockData.emails);
    const avatarPath = getRandomItem<string>(this.mockData.avatars);
    const password = generatePassword();
    const isPro = !!generateRandomValue(0,1);
    const commentsCount =  generateRandomValue(MIN_COMMENTS, MAX_COMMENTS).toString();
    const latitude = generateRandomValue(MIN_LAT, MAX_LAT, LAT_LNG_ACCURACY).toString();
    const longitude = generateRandomValue(MIN_LNG, MAX_LNG, LAT_LNG_ACCURACY).toString();

    return [
      title, description, postDate, city,
      preview, photos, isPremium, isFavorite,
      rating, type, roomsCount, guestsCount, price,
      features, name, email, avatarPath,
      password, isPro, commentsCount, latitude,
      longitude].join('\t');
  }
}
