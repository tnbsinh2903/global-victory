import { RoleEndpoints, Role_CreateDTO, Role_deleteDTO, Role_FindOneDTO, Role_InfoDTO, Role_UpdateDTO, Role_FindPermissionOfUserDTO, } from "@global-victory/erp/api-interfaces";
import { Body, Controller, Delete, Get, Post, Put, Query, UseGuards } from "@nestjs/common";
import { Message_Response } from "libs/erp/api-interfaces/src/utils";
import { RoleService } from "./RoleService";
import { RolesGuard } from "../../auth/guard/RolesGuard";
import { RequirePermission } from "../../auth/decorator/RolesDecorator";
import { Permission } from "libs/erp/api-interfaces/src/utils/Enum";

@Controller()
export class RoleController {

    constructor(private roleService: RoleService) { };

    @UseGuards(RolesGuard)
    @RequirePermission(Permission.ROLE_VIEW)
    @Get(RoleEndpoints.Find)
    async find(): Promise<Role_InfoDTO[]> {
        return await this.roleService.find();
    };

    @Get(RoleEndpoints.FindOne)
    async findOne(@Query() payload: Role_FindOneDTO): Promise<Role_InfoDTO> {
        console.log(payload.id);

        return await this.roleService.findOne(payload.id);
    };

    @Get(RoleEndpoints.FindPermissionOfUserByEmail)
    async findPrmissionOfUserByEmail(@Query() payload: Role_FindPermissionOfUserDTO): Promise<Array<string>> {
        return await this.roleService.findPermissionByEmailUser(payload.email);
    };

    @UseGuards(RolesGuard)
    @RequirePermission(Permission.ROLE_CREATE)
    @Post(RoleEndpoints.Create)
    async create(@Body() payload: Role_CreateDTO): Promise<Message_Response> {
        console.log(payload)
        return await this.roleService.create({
            id: payload.id,
            name: payload.name,
            permissions: payload.permissions,
            created_at: payload.created_at,
            created_by: payload.created_by,
            updated_at: payload.updated_at,
            updated_by: payload.updated_by
        })
    };

    @UseGuards( RolesGuard)
    @RequirePermission(Permission.ROLE_UPDATE)
    @Put(RoleEndpoints.Update)
    async update(@Body() payload: Role_UpdateDTO): Promise<Message_Response> {
        return await this.roleService.update(payload);
    };

    @UseGuards( RolesGuard)
    @RequirePermission(Permission.ROLE_DELETE)
    @Delete(RoleEndpoints.Delete)
    async delete(@Query() query: Role_deleteDTO): Promise<Message_Response> {
        return await this.roleService.delete(query.id);
    };
} 