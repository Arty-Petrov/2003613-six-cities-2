import {Expose} from 'class-transformer';

export default class FeatureResponse {
  @Expose()
  public id!: string;

  @Expose()
  public name!: string;
}
