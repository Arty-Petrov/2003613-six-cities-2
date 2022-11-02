import { IsBoolean, IsEmail, IsString, Length } from 'class-validator';
import { UserNameLength, UserPasswordLength } from '../../../const/index.js';

export default class CreateUserDto {
  @Length(UserNameLength.Min, UserNameLength.Max,
    {
      message: `Description min length is ${UserNameLength.Min}, max is ${UserNameLength.Max}`
    })
  public name!: string;

  @IsEmail({}, {message: 'email must be valid address'})
  public email!: string;

  @IsBoolean()
  public isPro!: boolean;

  @IsString({message: 'password is required'})
  @Length(UserPasswordLength.Min, UserPasswordLength.Max, {message: `Password min length is ${UserPasswordLength.Min}, max is ${UserPasswordLength.Max}`})
  public password!: string;
}
