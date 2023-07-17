import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { GlobalConfig } from '../../../config';
import { AuthService } from '../AuthService';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh',) {
    constructor(private readonly authService: AuthService) {
        super({
            secretOrKey: GlobalConfig.Authentication.ServerKeyRefresh,
            jwtFromRequest: ExtractJwt.fromExtractors([(request: Request) => {
                let data = request.cookies["refresh-token"];
                if (!data) {
                    return null;
                }
                return data
            }])
        });
    }

    async validate(payload: any) {
        try {
            const user = await this.authService.validateUserAndPassword(payload.email)
            if (payload === null) {
                throw new UnauthorizedException("Invalid Token");
            }
            return user;
        } catch {
            Logger.error(this.error)
        }
    }
}