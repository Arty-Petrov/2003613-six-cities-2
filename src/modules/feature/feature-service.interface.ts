import { DocumentType } from '@typegoose/typegoose';
import CreateFeatureDto from './dto/create-feature.dto.js';
import { FeatureEntity } from './feature.entity.js';

export interface FeatureServiceInterface {
  create(dto: CreateFeatureDto): Promise<DocumentType<FeatureEntity>>;
  find(): Promise<DocumentType<FeatureEntity>[]>;
  findByName(name: string): Promise<DocumentType<FeatureEntity> | null>;
  findOrCreate(dto: CreateFeatureDto): Promise<DocumentType<FeatureEntity>>;
  exists(featureId: string): Promise<boolean>
}
