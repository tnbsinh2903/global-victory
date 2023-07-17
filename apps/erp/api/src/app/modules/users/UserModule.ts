import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './UserController';
import { User, UserSchema } from './UserSchema';
import { UserService } from './UserService';
import { Role, RoleSchema } from '../roles/RoleSchema';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../../auth/AuthService';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: User.name, schema: UserSchema }, { name: Role.name, schema: RoleSchema }]),
  ],
  controllers: [UserController],
  providers: [UserService, JwtService, AuthService],
  exports: [UserService],
})
export class UserModule { }
