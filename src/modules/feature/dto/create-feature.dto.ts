import { IsEnum } from 'class-validator';
import { Features } from '../../../types/features.enum.js';

export default class CreateFeatureDto {
  @IsEnum(Features, {message: `The field must contains any of these values: ${Object.values(Features).join(', ')}`})
  public name!: string;
}
