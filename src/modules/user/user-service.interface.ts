import { DocumentType, types } from '@typegoose/typegoose';
import { DocumentExistsInterface } from '../../types/document-exist.interface.js';
import CreateUserDto from './dto/create-user.dto.js';
import LoginUserDto from './dto/login-user.dto.js';
import { UserEntity } from './user.entity.js';

export interface UserServiceInterface extends DocumentExistsInterface{
  exists(email: string):Promise<boolean>
  create(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>>;
  findByEmail(userEmail: string): Promise<DocumentType<UserEntity> | null>;
  findOrCreate(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>>;
  verifyUser(dto: LoginUserDto, salt: string): Promise<DocumentType<UserEntity> | null>;
  addFavoriteOffer(userId: string, offerId: string): Promise<types.DocumentType<UserEntity> | null>
  removeFavoriteOffer(userId: string, offerId: string): Promise<types.DocumentType<UserEntity> | null>
}
