import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard, IAuthModuleOptions } from '@nestjs/passport';
import { ExtractJwt } from 'passport-jwt';
import { Request } from 'express'
import { Observable, async } from 'rxjs';
import { GlobalConfig } from '../../../config';

@Injectable()
export class AccessTokenGuard implements CanActivate {

    constructor(private jwtService: JwtService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            throw new UnauthorizedException();
        }
        try {
            const payload = await this.jwtService.verifyAsync(
                token,
                {
                    secret: GlobalConfig.Authentication.ServerKey
                }
            );
            request.user = payload;
        } catch {
            throw new UnauthorizedException();
        }
        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers['authorization'].split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }



}

