import {Expose, Type} from 'class-transformer';
import LoggedUserResponse from '../../user/response/logged-user.response.js';

export default class CommentResponse {
  @Expose()
  public id!: string;

  @Expose()
  public text!: string;

  @Expose()
  public rating!: number;

  @Expose({ name: 'createdAt'})
  public postDate!: string;

  @Expose({ name: 'userId'})
  @Type(() => LoggedUserResponse)
  public user!: LoggedUserResponse;
}
