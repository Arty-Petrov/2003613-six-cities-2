import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import HttpError from '../errors/http-error.js';
import { AuthorizeOwnerInterface } from '../../types/authorize-owner.interface.js';
import { MiddlewareInterface } from '../../types/middleware.interface.js';

export class AuthorizeOwnerMiddleware implements MiddlewareInterface {
  constructor(
    private service: AuthorizeOwnerInterface,
    private param: string
  ) {}

  public async execute({params, user}: Request, _res: Response, next: NextFunction): Promise<void> {
    const objectId = params[this.param];

    if (!await this.service.isOwner(user?.id, objectId)) {
      return next(new HttpError(
        StatusCodes.UNAUTHORIZED,
        'You are not authorized to this resource',
        'AuthorizeMiddleware'
      ));
    }
    return next();
  }
}
