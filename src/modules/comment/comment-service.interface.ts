import { DocumentType } from '@typegoose/typegoose';
import { CommentEntity } from './comment.entity.js';
import CreateCommentDto from './dto/create-comment.dto.js';

export interface CommentServiceInterface {
  calcRatingsByOfferId(offerId: string): Promise<{ offerRating: number, commentsCount: number }>;
  create(dto: CreateCommentDto): Promise<DocumentType<CommentEntity> | null>;
  deleteAllByOfferId(offerId: string): Promise<void>;
  findByOfferId(offerId: string): Promise<DocumentType<CommentEntity>[] | null>;
}
