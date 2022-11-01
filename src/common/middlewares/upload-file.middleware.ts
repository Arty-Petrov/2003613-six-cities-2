import {NextFunction, Request, Response} from 'express';
import {nanoid} from 'nanoid';
import multer, {diskStorage} from 'multer';
import {MiddlewareInterface} from '../../types/middleware.interface.js';
import mime from 'mime-types';

export class UploadFileMiddleware implements MiddlewareInterface {
  constructor(
    private uploadDirectory: string,
    private fieldName: string,
    private isArray: boolean = false,
  ) {}

  public async execute(req: Request, res: Response, next: NextFunction): Promise<void> {
    const storage = diskStorage({
      destination: this.uploadDirectory,
      filename: (_req, file, callback) => {
        const extension = mime.extension(file.mimetype);
        const filename = nanoid();
        callback(null, `${filename}.${extension}`);
      }
    });

    if (!this.isArray) {
      const uploadSingleFileMiddleware = multer({storage}).single(this.fieldName);
      uploadSingleFileMiddleware(req, res, next);
    } else {
      const uploadMultiFileMiddleware = multer({storage}).array(this.fieldName);
      uploadMultiFileMiddleware(req, res, next);
    }
  }
}
