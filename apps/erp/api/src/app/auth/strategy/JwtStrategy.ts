import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthService } from "../AuthService";
import { GlobalConfig } from "../../../config";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {

    constructor(private readonly authService: AuthService) {
        super({
            ignoreExpiration: false,
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
        const user = await this.authService.validateUserAndPassword(payload.email)
        if (payload === null) {
            throw new UnauthorizedException("Invalid Token");
        }
        return user;
    }
}