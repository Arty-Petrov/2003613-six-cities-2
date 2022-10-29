//TODO Возможно стоит убрать city.controller и его путь из route
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { inject, injectable } from 'inversify';
import { Controller } from '../../common/controller/controller.js';
import HttpError from '../../common/errors/http-error.js';
import { LoggerInterface } from '../../common/logger/logger.interface.js';
import { Component } from '../../types/component.types.js';
import { HttpMethod } from '../../types/http-method.enum.js';
import { fillDTO } from '../../utils/common.js';
import { CityServiceInterface } from './city-service.interface.js';
import CreateCityDto from './dto/create-city.dto.js';
import CityResponse from './response/city.response.js';

@injectable()
export default class CityController extends Controller {
  constructor(
    @inject(Component.LoggerInterface) logger: LoggerInterface,
    @inject(Component.CityServiceInterface) private readonly cityService: CityServiceInterface,
  ) {
    super(logger);

    this.logger.info('Register routes for CityController…');

    this.addRoute({path: '/', method: HttpMethod.Get, handler: this.index});
    this.addRoute({path: '/', method: HttpMethod.Post, handler: this.create});
  }

  public async index(_req: Request, res: Response): Promise<void> {
    const cities = await this.cityService.find();
    const cityResponse = fillDTO(CityResponse, cities);
    this.ok(res, cityResponse);
  }

  public async create(
    {body}: Request<Record<string, unknown>, CreateCityDto>,
    res: Response): Promise<void> {
    const existCity = await this.cityService.findByName(body.name);

    if (existCity) {
      throw new HttpError(
        StatusCodes.UNPROCESSABLE_ENTITY,
        `City with name «${body.name}» exists.`,
        'CityController'
      );
    }
    const result = await this.cityService.create(body);
    this.created(
      res,
      fillDTO(CityResponse, result)
    );
  }
}
