import {
  APIEndpoints,
  Auth_Response,
  Auth_SignInDTO,
} from '@global-victory/erp/api-interfaces';
import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, Res, UseGuards} from '@nestjs/common';
import { AuthService } from './AuthService';
import { Response, Request } from 'express';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AuthController {
  constructor(
    private authService: AuthService
  ) { }

  @HttpCode(HttpStatus.OK)
  @Post(APIEndpoints.Auth.SignIn)
  async signIn(@Body() payload: Auth_SignInDTO, @Res({ passthrough: true }) res: Response): Promise<Auth_Response> {
    return await this.authService.signIn(payload.email, payload.password, res);
  }

  @UseGuards(AuthGuard('jwt-access'))
  @Post(APIEndpoints.Auth.SignOut)
  async signOut(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<void> {
    const email = req.user['Email'];
    res.clearCookie("access-token", { maxAge: 0 })
    res.clearCookie("refresh-token", { maxAge: 0 })
    this.authService.logout(email)
  }

  @UseGuards(AuthGuard('jwt-access'))
  @Get(APIEndpoints.Auth.GetMyInfo)
  async getMyInfo(@Req() req: Request): Promise<string> {
    return "success";
  }

  @UseGuards(AuthGuard('jwt-refresh'))
  @Post(APIEndpoints.Auth.Refresh)
  async refreshToken(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<Object> {
    const email = req.user['Email'];
    return this.authService.refreshTokens(email, res);
  }

  @Post(APIEndpoints.Auth.RemoveCookie)
  async removeCookie(@Res({ passthrough: true }) res: Response): Promise<void> {
    res.clearCookie("access-token", { maxAge: 0 })
    res.clearCookie("refresh-token", { maxAge: 0 })
  }
}
