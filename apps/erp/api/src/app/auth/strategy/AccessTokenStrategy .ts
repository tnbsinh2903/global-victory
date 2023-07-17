import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { GlobalConfig } from '../../../config';
import { Request } from 'express'
import { AuthService } from '../AuthService';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt-access') {
    constructor(private readonly authService: AuthService) {
        super({
            secretOrKey: GlobalConfig.Authentication.ServerKey,
            jwtFromRequest: ExtractJwt.fromExtractors([(request: Request) => {
                let data = request.cookies["access-token"];
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