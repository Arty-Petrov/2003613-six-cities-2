import {Expose} from 'class-transformer';

export default class CityResponse {
  @Expose()
  public id!: string;

  @Expose()
  public name!: string;
}
