import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RoleController } from './RoleController';
import { Role, RoleSchema } from './RoleSchema';
import { RoleService } from './RoleService';
import { UserModule } from '../users';
import { User, UserSchema } from '../users/UserSchema';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    UserModule,
    MongooseModule.forFeature(
      [{ name: User.name, schema: UserSchema }, { name: Role.name, schema: RoleSchema }]
    ),
  ],
  controllers: [RoleController],
  providers: [RoleService, JwtService,],
  exports: [RoleService],
})

export class RoleModule { }

