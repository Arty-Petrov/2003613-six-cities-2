//TODO Сделать валидацию DTO
import {
  ArrayMaxSize,
  ArrayMinSize,
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsDateString,
  IsEnum,
  IsInt,
  IsMongoId,
  IsNotEmptyObject,
  Length,
  Matches,
  Max,
  Min,
} from 'class-validator';
import { OfferDescriptionLength, OfferGuestsCount, OfferPriceValue, OfferTitleLength } from '../../../const/index.js';
import OfferPhotosCount from '../../../const/offer-photos-count.const.js';
import RoomsCountConst from '../../../const/offer-rooms-count.const.js';
import { Address } from '../../../types/address.type.js';
import { Features } from '../../../types/features.enum.js';
import { OfferType } from '../../../types/offer-type.enum.js';

export default class UpdateOfferDto {
  @Length(OfferTitleLength.Min, OfferTitleLength.Max,
    {
      message: `Title min length is  ${OfferTitleLength.Min}, max is ${OfferTitleLength.Max}`
    })
  public title?: string;

  @Length(OfferDescriptionLength.Min, OfferDescriptionLength.Max,
    {
      message: `Description min length is ${OfferDescriptionLength.Min}, max is ${OfferDescriptionLength.Max}`
    })
  public description?: string;

  @IsDateString({}, {message: 'Offer date must be valid ISO date'})
  public postDate?: Date;

  @IsMongoId({each: true, message: 'City field must be a valid cityId'})
  public cityId?: string;

  @Matches(/[\w/-]+.(jpg|png)/, { message: 'Preview image must be jpg or png' })
  public preview?: string;

  @IsArray({message: 'Photos must be an array'})
  @ArrayMinSize(OfferPhotosCount.Strict, {message: `Should be ${OfferPhotosCount.Strict} images`})
  @ArrayMaxSize(OfferPhotosCount.Strict, {message: `Should be ${OfferPhotosCount.Strict} images`})
  @Matches(/[\w/-]+.(jpg|png)/, { each: true, message: 'All photos must be jpg or png' })
  public photos?: string[];

  @IsBoolean()
  public isPremium?: boolean;

  @IsBoolean()
  public isFavorite?: boolean;

  @IsEnum(OfferType, {message: `Type of offer must contains any of these values: ${Object.values(OfferType).join(', ')}`})
  public offerType?: string;

  @IsInt({message: 'Rooms count must be an integer'})
  @Min(RoomsCountConst.Min, {message: `Minimum rooms is ${RoomsCountConst.Min}`})
  @Max(RoomsCountConst.Max, {message: `Maximum rooms is ${RoomsCountConst.Max}`})
  public roomsCount?: number;

  @IsInt({message: 'Guests count must be an integer'})
  @Min(OfferGuestsCount.Min, {message: `Minimum allowed guests is ${OfferGuestsCount.Min}`})
  @Max(OfferGuestsCount.Max, {message: `Maximum allowed guests is ${OfferGuestsCount.Max}`})
  public guestsCount?: number;

  @IsInt({message: 'Price must be an integer'})
  @Min(OfferPriceValue.Min, {message: `Minimum price is ${OfferPriceValue.Min}`})
  @Max(OfferPriceValue.Max, {message: `Maximum price is ${OfferPriceValue.Max}`})
  public price?: number;

  @IsArray({message: 'Features must be an array'})
  @ArrayNotEmpty()
  @IsEnum(Features, {each: true, message: `Offer features list must contains any of these values: ${Object.values(Features).join(', ')}`})
  public features?: string[];

  @IsMongoId({each: true, message: 'User field must be a string with valid userId'})
  public userId?: string;

  @IsNotEmptyObject()
  public address?: Address;
}
