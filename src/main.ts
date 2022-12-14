import { types } from '@typegoose/typegoose';
import { Container } from 'inversify';
import 'reflect-metadata';
import Application from './app/application.js';
import { ConfigInterface } from './common/config/config.interface.js';
import ConfigService from './common/config/config.service.js';
import { ControllerInterface } from './common/controller/controller.interface.js';
import { DatabaseInterface } from './common/database-client/database.interface.js';
import DatabaseService from './common/database-client/database.service.js';
import { ExceptionFilterInterface } from './common/errors/exception-filter.interface.js';
import ExceptionFilter from './common/errors/exception-filter.js';
import { LoggerInterface } from './common/logger/logger.interface.js';
import LoggerService from './common/logger/logger.service.js';
import { CityServiceInterface } from './modules/city/city-service.interface.js';
import { CityEntity, CityModel } from './modules/city/city.entity.js';
import CityService from './modules/city/city.service.js';
import { CommentServiceInterface } from './modules/comment/comment-service.interface.js';
import CommentController from './modules/comment/comment.controller.js';
import { CommentEntity, CommentModel } from './modules/comment/comment.entity.js';
import CommentService from './modules/comment/comment.service.js';
import FavoriteController from './modules/favorite/favorite.controller.js';
import { OfferServiceInterface } from './modules/offer/offer-service.interface.js';
import OfferController from './modules/offer/offer.controller.js';
import { OfferEntity, OfferModel } from './modules/offer/offer.entity.js';
import OfferService from './modules/offer/offer.service.js';
import { UserServiceInterface } from './modules/user/user-service.interface.js';
import UserController from './modules/user/user.controller.js';
import { UserEntity, UserModel } from './modules/user/user.entity.js';
import UserService from './modules/user/user.service.js';
import { Component } from './types/component.types.js';

const applicationContainer = new Container();
applicationContainer.bind<Application>(Component.Application).to(Application).inSingletonScope();
applicationContainer.bind<LoggerInterface>(Component.LoggerInterface).to(LoggerService).inSingletonScope();
applicationContainer.bind<ConfigInterface>(Component.ConfigInterface).to(ConfigService).inSingletonScope();
applicationContainer.bind<DatabaseInterface>(Component.DatabaseInterface).to(DatabaseService).inSingletonScope();
applicationContainer.bind<UserServiceInterface>(Component.UserServiceInterface).to(UserService);
applicationContainer.bind<types.ModelType<UserEntity>>(Component.UserModel).toConstantValue(UserModel);
applicationContainer.bind<OfferServiceInterface>(Component.OfferServiceInterface).to(OfferService);
applicationContainer.bind<types.ModelType<OfferEntity>>(Component.OfferModel).toConstantValue(OfferModel);
applicationContainer.bind<CommentServiceInterface>(Component.CommentServiceInterface).to(CommentService);
applicationContainer.bind<types.ModelType<CommentEntity>>(Component.CommentModel).toConstantValue(CommentModel);
applicationContainer.bind<CityServiceInterface>(Component.CityServiceInterface).to(CityService);
applicationContainer.bind<types.ModelType<CityEntity>>(Component.CityModel).toConstantValue(CityModel);

applicationContainer.bind<ControllerInterface>(Component.UserController).to(UserController).inSingletonScope();
applicationContainer.bind<ControllerInterface>(Component.OfferController).to(OfferController).inSingletonScope();
applicationContainer.bind<ControllerInterface>(Component.CommentController).to(CommentController).inSingletonScope();
applicationContainer.bind<ControllerInterface>(Component.FavoriteController).to(FavoriteController).inSingletonScope();
applicationContainer.bind<ExceptionFilterInterface>(Component.ExceptionFilterInterface).to(ExceptionFilter).inSingletonScope();

const application = applicationContainer.get<Application>(Component.Application);
await application.init();
