import typegoose, { defaultClasses, getModelForClass, Ref } from '@typegoose/typegoose';
import { OfferEntity } from '../offer/offer.entity.js';
import { UserEntity } from '../user/user.entity.js';

const {prop, modelOptions} = typegoose;

export interface CommentEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'comments'
  }
})
export class CommentEntity extends defaultClasses.TimeStamps {
  @prop({
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 1024
  })
  public text!: string;

  @prop({required: true})
  public postDate!: Date;

  @prop({
    required: true,
    min: 1,
    max: 5,
    default: 1
  })
  public rating!: number;

  @prop({
    required: true,
    ref: UserEntity
  })
  public userId!: Ref<UserEntity>;

  @prop({
    required: true,
    ref: UserEntity
  })
  public offerId!: Ref<OfferEntity>;
}

export const CommentModel = getModelForClass(CommentEntity);
