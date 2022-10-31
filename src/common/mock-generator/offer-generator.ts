import { LocationValue, OfferGuestsCount, OfferPriceValue, OfferRoomsCount } from '../../const/index.js';
import {City} from '../../types/city.enum.js';
import {Features} from '../../types/features.enum.js';
import {OfferType} from '../../types/offer-type.enum.js';
import {MockData} from '../../types/mock-data.type.js';
import {
  generateRandomValue,
  generateRandomDate,
  getRandomItem,
  getRandomItems
} from '../../utils/random.js';
import {MockGeneratorInterface} from './mock-generator.interface.js';

const MIN_DATE = '20220801';
const MAX_DATE = '20220901';
const MIN_LAT = 39;
const MAX_LAT = 43;
const MIN_LNG = 139;
const MAX_LNG = 143;

export default class OfferGenerator implements MockGeneratorInterface {
  constructor(private readonly mockData: MockData) {}

  public generate(): string {
    const title = getRandomItem<string>(this.mockData.titles);
    const description = getRandomItem<string>(this.mockData.descriptions);
    const postDate = generateRandomDate(MIN_DATE, MAX_DATE);
    const city = getRandomItem<string>(Array.from(Object.values(City)));
    const preview = getRandomItem<string>(this.mockData.photos);
    const photos = getRandomItems<string>(this.mockData.photos);
    const isPremium = !!generateRandomValue(0,1);
    const type = getRandomItem<string>(Array.from(Object.values(OfferType)));
    const roomsCount = generateRandomValue(OfferRoomsCount.Min, OfferRoomsCount.Max).toString();
    const guestsCount = generateRandomValue(OfferGuestsCount.Max, OfferGuestsCount.Max).toString();
    const price = generateRandomValue(OfferPriceValue.Min, OfferPriceValue.Max).toString();
    const features = getRandomItems<string>(Array.from(Object.values(Features)));
    const host = getRandomItem<string>(this.mockData.emails);
    const isPro = !!generateRandomValue(0,1);
    const commentsCount = 0;
    const latitude = generateRandomValue(MIN_LAT, MAX_LAT, LocationValue.Decimal).toString();
    const longitude = generateRandomValue(MIN_LNG, MAX_LNG, LocationValue.Decimal).toString();

    return [
      title, description, postDate, city, preview,
      photos, isPremium, type, roomsCount, guestsCount,
      price, features, host, isPro, commentsCount,
      latitude, longitude].join('\t');
  }
}
