import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { GlobalConfig } from '../../config';
import { RoleModule, UserModule } from '../modules';
import { AuthController } from './AuthController';
import { AuthService } from './AuthService';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../modules/users/UserSchema';
import { APP_GUARD } from '@nestjs/core';
import { JwtStrategy } from './strategy/JwtStrategy';

@Module({
  imports: [
    UserModule,
    RoleModule,
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    PassportModule,
    JwtModule.register({
      secret: GlobalConfig.Authentication.ServerKey,
      signOptions: { expiresIn: GlobalConfig.Authentication.ExpiresIn },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtStrategy
    }
  ],
})
export class AuthModule {}
