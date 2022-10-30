import { Expose, Type } from 'class-transformer';
import CityResponse from '../../city/response/city.response.js';
import FeatureResponse from '../../feature/response/feature.response.js';
import LoggedUserResponse from '../../user/response/logged-user.response.js';

export default class OfferFullResponse {
  @Expose()
  public id!: string;

  @Expose()
  public title!: string;

  @Expose()
  public description!: string;

  @Expose()
  public postDate!: string;

  @Expose()
  @Type(() => CityResponse)
  public city!: CityResponse;

  @Expose()
  public preview!: string;

  @Expose()
  public photos!: string[];

  @Expose()
  public isPremium!: boolean;

  @Expose()
  public isFavorite!: boolean;

  @Expose()
  public rating!: number;

  @Expose()
  public offerType!: string;

  @Expose()
  public roomsCount!: number;

  @Expose()
  public price!: number;

  @Expose()
  @Type(() => FeatureResponse)
  public features!: FeatureResponse;

  @Expose({ name: 'userId'})
  @Type(() => LoggedUserResponse)
  public user!: LoggedUserResponse;

  @Expose()
  public commentsCount!: number;

  @Expose()
  public longitude!: number;

  @Expose()
  public latitude!: number;
}
