import typegoose, {getModelForClass, defaultClasses} from '@typegoose/typegoose';
import { DEFAULT_LATITUDE, DEFAULT_LONGITUDE } from './city.const.js';

const {prop, modelOptions} = typegoose;

export interface CityEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'cities'
  }
})
export class CityEntity extends defaultClasses.TimeStamps {
  @prop({
    unique: true,
    required: true })
  public name!: string;

  @prop({
    default: DEFAULT_LATITUDE })
  public latitude?: number;

  @prop({
    default: DEFAULT_LONGITUDE })
  public longitude?: number;
}

export const CityModel = getModelForClass(CityEntity);
