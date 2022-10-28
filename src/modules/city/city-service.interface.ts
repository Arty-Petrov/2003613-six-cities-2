import { DocumentType } from '@typegoose/typegoose';
import CreateCityDto from './dto/create-city.dto.js';
import { CityEntity } from './city.entity.js';

export interface CityServiceInterface {
  create(dto: CreateCityDto): Promise<DocumentType<CityEntity>>;
  find(): Promise<DocumentType<CityEntity>[]>;
  findByName(name: string): Promise<DocumentType<CityEntity> | null>;
  findOrCreate(dto: CreateCityDto): Promise<DocumentType<CityEntity>>;
  exists(cityId: string): Promise<boolean>
 }
