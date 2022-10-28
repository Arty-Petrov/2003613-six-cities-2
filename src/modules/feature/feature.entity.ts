import typegoose, {getModelForClass, defaultClasses} from '@typegoose/typegoose';

const {prop, modelOptions} = typegoose;

export interface FeatureEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'cities'
  }
})
export class FeatureEntity extends defaultClasses.TimeStamps {
  @prop({
    unique: true,
    required: true
  })
  public name!: string;
}

export const FeatureModel = getModelForClass(FeatureEntity);
