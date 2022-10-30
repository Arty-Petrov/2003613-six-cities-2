import { IsMongoId, Length, Max, Min } from 'class-validator';
import { CommentRatingValue, CommentTextLength } from '../../../const/index.js';

export default class CreateCommentDto {
  @Length(CommentTextLength.Min, CommentTextLength.Max,
    {
      message: `Comment text min length is ${CommentTextLength.Min}, max is ${CommentTextLength.Max}`
    })
  public text!: string;

  @Min(CommentRatingValue.Min, {message: `Minimum comment rating is ${CommentRatingValue.Min}`})
  @Max(CommentRatingValue.Max, {message: `Maximum comment rating is ${CommentRatingValue.Max}`})
  public rating!: number;

  @IsMongoId({each: true, message: 'The field must be a string with valid userId'})
  public userId!: string;

  @IsMongoId({each: true, message: 'The field must be a string with valid offerId'})
  public offerId!: string;
}
