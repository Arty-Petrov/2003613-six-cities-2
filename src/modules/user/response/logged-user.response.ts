import {Expose} from 'class-transformer';

export default class LoggedUserResponse {
  @Expose()
  public email!: string ;

  @Expose()
  public name!: string;

  @Expose()
  public avatarUrl!: string;

  @Expose()
  public isPro!: boolean;

  @Expose()
  public token!: string;
}
