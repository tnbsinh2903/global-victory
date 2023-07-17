import { CanActivate, ExecutionContext, Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { GlobalConfig } from "../../../config";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "../../modules/users/UserSchema";
import { Model } from "mongoose";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        private reflector: Reflector,
        private jwtService: JwtService,
    ) { }

    listPermissions: string[];

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const requiredPermission = this.reflector.getAllAndOverride<[]>('roles', [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!requiredPermission) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        this.listPermissions = [];

        try {
            const payload = await this.jwtService.verifyAsync(
                token,
                {
                    secret: GlobalConfig.Authentication.ServerKey
                }
            );
            request.user = payload
            const users = await this.userModel.findOne({ 'Email': request.user['email'] });
            users.Role.Permissions.forEach(permission => {
                this.listPermissions.push(Object.values(permission)[0])
            })
        } catch {
            throw new UnauthorizedException();
        }
        return requiredPermission.some((permission) => this.listPermissions.includes(permission))
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        try {
            const [type, token] = request.headers['authorization'].split(' ') ?? [];
            return type === 'Bearer' ? token : undefined;
        } catch (error) {
            Logger.error(error)
        }
    }
}