import { IsEnum, IsNumber } from 'class-validator';
import { City } from '../../../types/city.enum.js';

export default class CreateCityDto {
  @IsEnum(City,
    {
      message: `City name must contains any of these values: ${Object.values(City).join(', ')}`})
  public name!: string;

  @IsNumber()
  public latitude?: number;

  @IsNumber()
  public longitude?: number;
}
