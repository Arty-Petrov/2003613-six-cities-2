import { DocumentType, types } from '@typegoose/typegoose';
import { inject, injectable } from 'inversify';
import { LoggerInterface } from '../../common/logger/logger.interface.js';
import { Component } from '../../types/component.types.js';
import { FeatureServiceInterface } from './feature-service.interface.js';
import { FeatureEntity } from './feature.entity.js';
import CreateFeatureDto from './dto/create-feature.dto.js';

@injectable()
export default class FeatureService implements FeatureServiceInterface{
  constructor(
    @inject(Component.LoggerInterface) private readonly logger: LoggerInterface,
    @inject(Component.FeatureModel) private readonly featureModel: types.ModelType<FeatureEntity>
  ) {}

  public async create(dto: CreateFeatureDto): Promise<DocumentType<FeatureEntity>> {
    const feature = await this.featureModel.create(dto);
    this.logger.info(`The feature ${dto.name} is created`);

    return feature;
  }

  public async find(): Promise<DocumentType<FeatureEntity>[]> {
    return this.featureModel
      .find()
      .exec();
  }

  public async findByName(name: string): Promise<DocumentType<FeatureEntity> | null> {
    return this.featureModel.findOne({name});
  }

  public async findOrCreate(dto: CreateFeatureDto): Promise<DocumentType<FeatureEntity>> {
    const feature = await this.findByName(dto.name);
    return feature ? feature : this.create(dto);
  }

  public async exists(featureId: string): Promise<boolean> {
    return (await this.featureModel.exists({_id: featureId})) !== null;
  }
}
