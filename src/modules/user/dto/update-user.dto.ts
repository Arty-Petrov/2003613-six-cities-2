import { Matches } from 'class-validator';

export default class UpdateUserDto {

  @Matches(/[\w/-]+.(jpg|png)/, { message: 'Avatar  image must be jpg or png' })
  public avatarUrl?: string;

}
