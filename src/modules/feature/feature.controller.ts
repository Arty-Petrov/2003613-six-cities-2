import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { inject, injectable } from 'inversify';
import { Controller } from '../../common/controller/controller.js';
import HttpError from '../../common/errors/http-error.js';
import { LoggerInterface } from '../../common/logger/logger.interface.js';
import { Component } from '../../types/component.types.js';
import { HttpMethod } from '../../types/http-method.enum.js';
import { fillDTO } from '../../utils/common.js';
import { FeatureServiceInterface } from './feature-service.interface.js';
import CreateFeatureDto from './dto/create-feature.dto.js';
import FeatureResponse from './response/feature.response.js';

@injectable()
export default class FeatureController extends Controller {
  constructor(
    @inject(Component.LoggerInterface) logger: LoggerInterface,
    @inject(Component.FeatureServiceInterface) private readonly featureService: FeatureServiceInterface
  ) {
    super(logger);

    this.logger.info('Register routes for FeatureController…');

    this.addRoute({path: '/', method: HttpMethod.Get, handler: this.index});
    this.addRoute({path: '/', method: HttpMethod.Post, handler: this.create});
  }

  public async index(_req: Request, res: Response): Promise<void> {
    const cities = await this.featureService.find();
    const featureResponse = fillDTO(FeatureResponse, cities);
    this.ok(res, featureResponse);
  }

  public async create(
    {body}: Request<Record<string, unknown>, CreateFeatureDto>,
    res: Response): Promise<void> {
    const existFeature = await this.featureService.findByName(body.name);

    if (existFeature) {
      throw new HttpError(
        StatusCodes.UNPROCESSABLE_ENTITY,
        `Feature with name «${body.name}» exists.`,
        'FeatureController'
      );
    }
    const result = await this.featureService.create(body);
    this.created(
      res,
      fillDTO(FeatureResponse, result)
    );
  }
}
