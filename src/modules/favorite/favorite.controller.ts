import { Request, Response } from 'express';
import * as core from 'express-serve-static-core';
import { StatusCodes } from 'http-status-codes';
import { inject, injectable } from 'inversify';
import { ConfigInterface } from '../../common/config/config.interface.js';
import { Controller } from '../../common/controller/controller.js';
import { LoggerInterface } from '../../common/logger/logger.interface.js';
import { DocumentExistsMiddleware } from '../../common/middlewares/document-exists.middleware.js';
import { PrivateRouteMiddleware } from '../../common/middlewares/private-route.middleware.js';
import { ValidateObjectIdMiddleware } from '../../common/middlewares/validate-objectId.middleware.js';
import { Component } from '../../types/component.types.js';
import { HttpMethod } from '../../types/http-method.enum.js';
import { fillDTO } from '../../utils/common.js';
import { OfferServiceInterface } from '../offer/offer-service.interface.js';
import OfferShortResponse from '../offer/response/offer-short.response.js';
import { UserServiceInterface } from '../user/user-service.interface.js';

type ParamsGetFavorite = {
  userId: string
}

type ParamsChangeFavorite = {
  offerId: string,
  userId: string
}

@injectable()
export default class FavoriteController extends Controller {
  constructor(
    @inject(Component.LoggerInterface) logger: LoggerInterface,
    @inject(Component.ConfigInterface) configService: ConfigInterface,
    @inject(Component.OfferServiceInterface) private readonly offerService: OfferServiceInterface,
    @inject(Component.UserServiceInterface) private readonly userService: UserServiceInterface
  ) {
    super(logger, configService);

    this.logger.info('Register routes for FavoriteController…');

    this.addRoute({
      path: '/',
      method: HttpMethod.Get,
      handler: this.getFavorites,
      middlewares:[
        new PrivateRouteMiddleware(),
      ]
    });
    this.addRoute({
      path: '/:userId/:offerId',
      method: HttpMethod.Post,
      handler: this.addFavorite,
      middlewares: [
        new ValidateObjectIdMiddleware('userId'),
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'offer', 'offerId')
      ]
    });
    this.addRoute({
      path: '/:userId/:offerId',
      method: HttpMethod.Delete,
      handler: this.removeFavorite,
      middlewares: [
        new ValidateObjectIdMiddleware('userId'),
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'offer', 'offerId')
      ]});
  }

  public async getFavorites(
    {user}: Request<core.ParamsDictionary | ParamsGetFavorite>, res: Response): Promise<void> {
    const userData = await this.userService.findByEmail(user.email);
    const favoritesIdList = userData?.favorites?? [];
    if (favoritesIdList.length){
      const favoriteOffers = await this.offerService.findFavorites(favoritesIdList);
      this.ok(res, fillDTO(OfferShortResponse, favoriteOffers));
    } else {
      this.noContent(res, StatusCodes.NO_CONTENT);
    }
  }

  public async addFavorite({params}: Request<core.ParamsDictionary | ParamsChangeFavorite>, res: Response): Promise<void> {
    const {userId, offerId} = params;
    const userFavorite = await this.userService.addFavoriteOffer(userId, offerId);
    this.ok(res, fillDTO(OfferShortResponse, userFavorite));
  }

  public async removeFavorite({params}: Request<core.ParamsDictionary | ParamsChangeFavorite>, res: Response): Promise<void> {
    const {userId, offerId} = params;
    const userFavorite = await this.userService.removeFavoriteOffer(userId, offerId);
    this.ok(res, fillDTO(OfferShortResponse, userFavorite));
  }
}

