import { ForbiddenException, HttpException, HttpStatus, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../modules/users/UserService';
import { Auth_Response, User_ResponseLogin } from '@global-victory/erp/api-interfaces';
import { User, UserDocument } from '../modules/users/UserSchema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';
import { GlobalConfig } from '../../config';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
    private userService: UserService
  ) { }

  listPermissions: string[];

  async signIn(user_email: string, user_password: string, res: Response): Promise<Auth_Response> {

    try {
      this.listPermissions = [];
      const getUser = await this.userModel.findOne({ 'Email': user_email });

      getUser.Role.Permissions.forEach(permission => {
        this.listPermissions.push(Object.values(permission)[0])
      })
      const user: User_ResponseLogin = {
        display_name: getUser.DisplayName,
        email: getUser.Email,
        phone: getUser.Phone,
        address: getUser.Address,
        updated_at: getUser.UpdatedAt,
        permissions: this.listPermissions,
        avatar_url: getUser.AvatarUrl
      }

      const passWordMathch = await bcrypt.compare(user_password, getUser.Password);
      if (!passWordMathch || !getUser) {
        throw new HttpException({ status: "error", message: 'Email Or Password Invalid !', title: "Errors" }, HttpStatus.BAD_REQUEST);

      }

      const access_token = this.jwtService.sign(user,
        {
          secret: GlobalConfig.Authentication.ServerKey,
          expiresIn: GlobalConfig.Authentication.ExpiresIn
        });
      const refresh_token = this.jwtService.sign(user, {
        secret: GlobalConfig.Authentication.ServerKeyRefresh,
        expiresIn: GlobalConfig.Authentication.ExpiresInRefresh
      });
      this.updateRefreshTokenAuth(user.email, refresh_token);
      res.cookie('access-token', access_token, { expires: new Date(Date.now() + (30 * 24 * 3600000)), httpOnly: true })
      res.cookie('refresh-token', refresh_token, { expires: new Date(Date.now() + (30 * 24 * 3600000)), httpOnly: true })

      return {
        user: user,
        access_token: access_token,
        refresh_token: refresh_token,
        permissions: this.listPermissions
      };
    } catch {
      throw new HttpException({ status: "error", message: 'Email Or Password Invalid !', title: "Errors" }, HttpStatus.BAD_REQUEST);

    }
  }

  async logout(email: string) {
    try {
      return await this.userService.updateRefreshTokenUser(email, null)
    } catch (error) {
      Logger.error(error)
    }
  }

  async updateRefreshTokenAuth(email: string, refreshToken: string) {
    try {
      await this.userService.updateRefreshTokenUser(email, refreshToken);
    } catch (error) {
      Logger.error(error)

    }
  }

  async refreshTokens(email: string, res: Response) {
    this.listPermissions = [];
    try {
      const getUser = await this.userModel.findOne({ 'Email': email });

      getUser.Role.Permissions.forEach(permission => {
        this.listPermissions.push(Object.values(permission)[0])
      })
      if (!getUser || !getUser.RefreshToken) {
        throw new ForbiddenException('Access Denid');
      }
      const user: User_ResponseLogin = {
        display_name: getUser.DisplayName,
        email: getUser.Email,
        phone: getUser.Phone,
        address: getUser.Address,
        updated_at: getUser.UpdatedAt,
        permissions: this.listPermissions,
        avatar_url: getUser.AvatarUrl
      }
      const access_token = this.jwtService.sign(user,
        {
          secret: GlobalConfig.Authentication.ServerKey,
          expiresIn: GlobalConfig.Authentication.ExpiresIn
        });
      const refresh_token = this.jwtService.sign(user, {
        secret: GlobalConfig.Authentication.ServerKeyRefresh,
        expiresIn: GlobalConfig.Authentication.ExpiresInRefresh
      });
      res.cookie('access-token', access_token, { expires: new Date(Date.now() + 900000), httpOnly: true })
      res.cookie('refresh-token', refresh_token, { expires: new Date(Date.now() + 900000), httpOnly: true })
      await this.updateRefreshTokenAuth(email, refresh_token);

      return { access_token, refresh_token, permissions: this.listPermissions }

    } catch (error) {
      Logger.error(error)
    }
  }

  async validateUserAndPassword(email: string): Promise<any> {
    try {
      const user = await this.userModel.findOne({ 'Email': email });
      if (!user) {
        throw new UnauthorizedException();
      }
      return user;
    } catch (error) {
      Logger.error(error)
    }
  }
}
