import typegoose, { defaultClasses, getModelForClass, Ref, Severity } from '@typegoose/typegoose';
import { Address } from '../../types/address.type.js';
import { Features } from '../../types/features.enum.js';
import { OfferType } from '../../types/offer-type.enum.js';
import { CityEntity } from '../city/city.entity.js';
import { UserEntity } from '../user/user.entity.js';

const {prop, modelOptions} = typegoose;

export interface OfferEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'offers'
  }
})
export class OfferEntity extends defaultClasses.TimeStamps {
  @prop({
    required: true,
    trim: true,
    minlength: 10,
    maxlength: 100
  })
  public title!: string;

  @prop({
    required: true,
    trim: true,
    minlength: 20,
    maxlength: 1024
  })
  public description!: string;

  @prop({required: true})
  public postDate!: Date;

  @prop({
    required: true,
    ref: CityEntity
  })
  public cityId!: Ref<CityEntity>;

  @prop({required: true})
  public preview!: string;

  @prop({
    required: true,
    allowMixed: Severity.ALLOW })
  public photos!: string[];

  @prop({required: true})
  public isPremium!: boolean;

  @prop()
  public isFavorite!: boolean;

  @prop({
    min: 0,
    max: 5,
    default: 0
  })
  public rating!: number;

  @prop({
    required: true,
    type: () => String,
    enum: OfferType
  })
  public offerType!: OfferType;

  @prop({
    required: true,
    min: 1,
    max: 8,
  })
  public roomsCount!: number;

  @prop({
    required: true,
    min: 1,
    max: 10,
  })
  public guestsCount!: number;

  @prop({
    required: true,
    min: 100,
    max: 100000,
  })
  public price!: number;

  @prop({
    required: true,
    allowMixed: Severity.ALLOW
  })
  public features!: Features[];

  @prop({
    required: true,
    ref: UserEntity
  })
  public userId!: Ref<UserEntity>;

  @prop({default: 0})
  public commentsCount!: number;

  @prop({
    required: true,
    allowMixed: Severity.ALLOW
  })
  public address!: Address;
}

export const OfferModel = getModelForClass(OfferEntity);
