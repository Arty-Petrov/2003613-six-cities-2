import { DocumentType, types } from '@typegoose/typegoose';
import { inject, injectable } from 'inversify';
import { LoggerInterface } from '../../common/logger/logger.interface.js';
import { Component } from '../../types/component.types.js';
import { SortType } from '../../types/sort-type.enum.js';
import { CommentServiceInterface } from './comment-service.interface.js';
import { DEFAULT_COMMENTS_COUNT } from './comment.const.js';
import { CommentEntity } from './comment.entity.js';
import CreateCommentDto from './dto/create-comment.dto.js';

@injectable()
export default class CommentService implements CommentServiceInterface {
  constructor(
    @inject(Component.LoggerInterface) private  readonly logger: LoggerInterface,
    @inject(Component.CommentModel) private readonly commentModel: types.ModelType<CommentEntity>,
  ) {}

  public async calcRatingsByOfferId(offerId: string): Promise<number> {
    const ratingsSum: {_id: null, total: number}[] =
      await this.commentModel
        .aggregate([
          {$match: {offerId: offerId}},
          {$group: {_id: null, total: {$sum: '$rating'}}},
        ])
        .exec();

    const commentsCount: number =
      this.commentModel
        .findById(offerId).commentCount++;

    return (ratingsSum[0].total / commentsCount)?? 0;
  }

  public async createComment(dto: CreateCommentDto): Promise<DocumentType<CommentEntity> | null> {
    const comment = await this.commentModel.create(dto);
    this.logger.info('New comment was created');
    return comment.populate(['userId']);
  }

  public async deleteAllByOfferId(offerId: string): Promise<void>{
    this.commentModel
      .deleteMany({offerId})
      .exec();
  }

  public async findByOfferId(offerId: string): Promise<DocumentType<CommentEntity>[] | null> {
    return this.commentModel
      .find({offerId: offerId})
      .limit(DEFAULT_COMMENTS_COUNT)
      .sort({postDate: SortType.Down})
      .populate(['userId'])
      .exec();
  }
}
