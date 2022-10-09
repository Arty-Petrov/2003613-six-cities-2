import typegoose, { defaultClasses, getModelForClass, Ref, Severity } from '@typegoose/typegoose';
import { City } from '../../const/city.enum.js';
import { Features } from '../../const/features.enum.js';
import { OfferType } from '../../const/offer-type.enum.js';
import { Address } from '../../types/address.type.js';
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
    allowMixed: Severity.ALLOW
  })
  public city!: City;

  @prop({required: true})
  public preview!: string;

  @prop({
    required: true,
    allowMixed: Severity.ALLOW })
  public photos!: string[];

  @prop({required: true})
  public isPremium!: boolean;

  @prop({required: true})
  public isFavorite!: boolean;

  @prop({
    required: true,
    min: 1,
    max: 5,
    default: 1
  })
  public rating!: number;

  @prop({
    required: true,
    type: () => String,
    enum: OfferType
  })
  public type!: OfferType;

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

  @prop({required: true})
  public address!: Address;
}

export const OfferModel = getModelForClass(OfferEntity);
