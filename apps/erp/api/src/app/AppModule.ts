import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GlobalConfig } from '../config';
import { AuthModule } from './auth';
import { BannerModule, ProductModule, RoleModule, UserModule } from './modules';
import { UploadModule } from './modules/upload/UploadModule';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PATH_FILE_AVATAR_UPLOAD, PATH_FILE_BANNER_UPLOAD, PATH_FILE_NEWS_UPLOAD } from './_shared/pathFile';
import { NewsModule } from './modules/news';
import { JwtStrategy } from './auth/strategy/JwtStrategy';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthService } from './auth/AuthService';
import { UserSchema } from './modules/users/UserSchema';
import { LoggingInterceptor } from './auth/LoggingInterceptor';
import { RolesGuard } from './auth/guard/RolesGuard';
import { AccessTokenStrategy } from './auth/strategy/AccessTokenStrategy ';
import { RefreshTokenStrategy } from './auth/strategy/RefreshTokenStrategy';
const dir = GlobalConfig.DIR

@Module({
  imports: [
    ServeStaticModule.forRoot(
      {
        rootPath: join(dir, PATH_FILE_AVATAR_UPLOAD),
        renderPath: '/avatar-user',
      },
      {
        rootPath: join(dir, PATH_FILE_NEWS_UPLOAD),
        renderPath: '/image-cover',
      },
      {
        rootPath: join(dir, PATH_FILE_BANNER_UPLOAD),
        renderPath: '/image-banner',
      }),
    AuthModule,
    UserModule,
    NewsModule,
    UploadModule,
    RoleModule,
    BannerModule,
    ProductModule,
    MongooseModule.forRoot(GlobalConfig.Database.MongoURI),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    JwtModule.register({
      secret: GlobalConfig.Authentication.ServerKey,
      signOptions: { expiresIn: GlobalConfig.Authentication.ExpiresIn },
    }),
  ],

  providers: [JwtStrategy, AuthService, JwtModule, JwtService,
    AccessTokenStrategy,
    RefreshTokenStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtStrategy
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})


export class AppModule {
  constructor() {
  }
}