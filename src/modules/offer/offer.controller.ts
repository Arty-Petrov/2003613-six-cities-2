import { Request, Response } from 'express';
import * as core from 'express-serve-static-core';
import { StatusCodes } from 'http-status-codes';
import { inject, injectable } from 'inversify';
import { Controller } from '../../common/controller/controller.js';
import HttpError from '../../common/errors/http-error.js';
import { LoggerInterface } from '../../common/logger/logger.interface.js';
import { DocumentExistsMiddleware } from '../../common/middlewares/document-exists.middleware.js';
import { PrivateRouteMiddleware } from '../../common/middlewares/private-route.middleware.js';
import { ValidateDtoMiddleware } from '../../common/middlewares/validate-dto.middleware.js';
import { ValidateObjectIdMiddleware } from '../../common/middlewares/validate-objectId.middleware.js';
import { Component } from '../../types/component.types.js';
import { HttpMethod } from '../../types/http-method.enum.js';
import { RequestQuery } from '../../types/request-query.type.js';
import { fillDTO } from '../../utils/common.js';
import { CityServiceInterface } from '../city/city-service.interface.js';
import CreateOfferDto from './dto/create-offer.dto.js';
import UpdateOfferDto from './dto/update-offer.dto.js';
import { OfferServiceInterface } from './offer-service.interface.js';
import OfferFullResponse from './response/offer-full.response.js';
import OfferShortResponse from './response/offer-short.response.js';

type ParamsGetOffer = {
  offerId: string;
}

type ParamsGetCity = {
  cityId: string;
}

@injectable()
export default class OfferController extends Controller {
  constructor(
    @inject(Component.LoggerInterface) logger: LoggerInterface,
    @inject(Component.OfferServiceInterface) private readonly offerService: OfferServiceInterface,
    @inject(Component.CityServiceInterface) private readonly cityService: CityServiceInterface,
  ) {
    super(logger);

    this.logger.info('Register routes for OfferController…');
    this.addRoute({
      path: '/',
      method: HttpMethod.Get,
      handler: this.index,
      middlewares: [new ValidateDtoMiddleware(CreateOfferDto)],
    });
    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateDtoMiddleware(CreateOfferDto),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ],
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Get,
      handler: this.getOfferById,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ],
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Delete,
      handler: this.delete,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ],
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Patch,
      handler: this.update,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ],
    });
    this.addRoute({
      path: '/:cityId/premium',
      method: HttpMethod.Get,
      handler: this.getPremiums,
      middlewares: [
        new DocumentExistsMiddleware(this.cityService, 'City', 'cityId'),
      ],
    });
  }

  public async getOfferById(
    {params}: Request<core.ParamsDictionary | ParamsGetOffer>,
    res: Response
  ): Promise<void> {
    const {offerId} = params;
    this.logger.info(offerId);
    const offer = await this.offerService.show(offerId);
    this.ok(res, fillDTO(OfferFullResponse, offer));
  }

  public async index({query}: Request, res: Response) {
    const offersList = await this.offerService.find(Number(query.limit));
    if (!offersList) {
      throw new Error('Failed to get offers');
    }
    return this.ok(res, fillDTO(OfferShortResponse, offersList));
  }

  public async create(
    req: Request<Record<string, unknown>, Record<string, unknown>, CreateOfferDto>,
    res: Response
  ): Promise<void> {
    const {body, user} = req;
    const result = await this.offerService.create({...body, userId: user.id});
    const offer = await this.offerService.show(result.id);
    this.created(res, fillDTO(OfferFullResponse, offer));
  }

  public async delete(
    {user, params}: Request<Record<string, string>, Record<string, unknown>>,
    res: Response
  ): Promise<void> {
    const {email} = user;
    const {offerId} = params;

    this.checkOfferOwnership(offerId, email);

    const offer = await this.offerService.deleteById(offerId as string);
    this.noContent(res, offer);
  }

  public async update(
    {user, body, params}: Request<Record<string, string>, Record<string, unknown>, Record<string, unknown>, UpdateOfferDto>,
    res: Response
  ): Promise<void> {
    const {email} = user;
    const {offerId} = params;

    this.checkOfferOwnership(offerId, email);

    const updatedOffer = await this.offerService.updateById(offerId, body);
    this.ok(res, fillDTO(OfferFullResponse, updatedOffer));
  }

  public async getPremiums(
    {params}: Request<core.ParamsDictionary | ParamsGetCity, unknown, unknown, RequestQuery>,
    res: Response
  ):Promise<void> {
    const offers = await this.offerService.findPremiums(params.cityId);
    this.ok(res, fillDTO(OfferShortResponse, offers));
  }

  private async checkOfferOwnership(offerId: string, userEmail: string): Promise<void> {
    const offerUserEmail = fillDTO(OfferFullResponse, await this.offerService.show(offerId)).user.email;

    if (offerUserEmail !== userEmail) {
      throw new HttpError(
        StatusCodes.UNAUTHORIZED,
        `User with email ${userEmail} is not authorized to change offer ${offerId}.`,
        'OfferController');
      return;
    }
  }
}
