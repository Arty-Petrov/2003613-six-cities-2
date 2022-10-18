import { DocumentType, types } from '@typegoose/typegoose';
import { inject } from 'inversify';
import { LoggerInterface } from '../../common/logger/logger.interface.js';
import { Component } from '../../types/component.types.js';
import { CityServiceInterface } from './city-service.interface.js';
import { CityEntity } from './city.entity.js';
import CreateCityDto from './dto/create-city.dto.js';

export default class CityService implements CityServiceInterface{
  constructor(
    @inject(Component.LoggerInterface) private readonly logger: LoggerInterface,
    @inject(Component.CityModel) private readonly cityModel: types.ModelType<CityEntity>
  ) {}

  public async create(dto: CreateCityDto): Promise<DocumentType<CityEntity>> {
    const city = await this.cityModel.create(dto);
    this.logger.info(`The city ${dto.cityName} is created`);

    return city;
  }

  public async findByName(name: string): Promise<DocumentType<CityEntity> | null> {
    return this.cityModel.findOne({name});
  }

  public async findOrCreate(dto: CreateCityDto): Promise<DocumentType<CityEntity>> {
    const city = await this.findByName(dto.cityName);
    return city ? city : this.create(dto);
  }

  public async exists(cityId: string): Promise<boolean> {
    return (await this.cityModel.exists({_id: cityId})) !== null;
  }
}
