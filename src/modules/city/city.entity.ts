import typegoose, {getModelForClass, defaultClasses} from '@typegoose/typegoose';

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
  public cityName!: string;

  @prop({
    required: true,
    default: DEFAULT_LATITUDE })
  public latitude?: number;

  @prop({
    required: true,
    default: DEFAULT_LONGITUDE })
  public longitude?: number;
}

export const CityModel = getModelForClass(CityEntity);
