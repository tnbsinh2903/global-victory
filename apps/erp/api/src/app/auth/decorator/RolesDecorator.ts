import { SetMetadata } from "@nestjs/common";

export const RequirePermission = (...roles: string[]) => SetMetadata('roles',roles)