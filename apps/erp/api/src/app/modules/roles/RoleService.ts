import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Role } from "./RoleSchema";
import { Role_CreateDTO, Role_InfoDTO, Role_UpdateDTO } from '@global-victory/erp/api-interfaces'
import { Message_Response } from "libs/erp/api-interfaces/src/utils";
import { APP_CONSTANT_PERMISSIONS, Permission } from "libs/erp/api-interfaces/src/modules/roles/RolePermissions"
import { UserService } from "../users/UserService";
import { User } from "../users/UserSchema";

@Injectable()
export class RoleService {
    constructor(
        @InjectModel(Role.name) private roleModel: Model<Role>,
        private userService: UserService,
        @InjectModel(User.name) private userModel: Model<User>
    ) { };
    async find(): Promise<Role_InfoDTO[]> {
        try {
            const data: Role[] = await this.roleModel.find({ IsDeleted: false });
            const result: Role_InfoDTO[] = data.map((role_data: Role) => ({
                id: role_data._id,
                name: role_data.Name,
                permissions: role_data.Permissions,
                created_at: role_data.CreatedAt,
                created_by: role_data.CreatedBy,
                updated_at: role_data.UpdatedAt,
                updated_by: role_data.UpdatedBy,
            }))
            return result;
        } catch (error) {
            Logger.error(error)
        }
    };

    async findOne(id: string): Promise<Role_InfoDTO> {
        try {
            const role_data = await this.roleModel.findById({ _id: id }, { IsDeleted: false });
            return {
                id: role_data._id,
                name: role_data.Name,
                permissions: role_data.Permissions,
                created_at: role_data.CreatedAt,
                created_by: role_data.CreatedBy,
                updated_at: role_data.UpdatedAt,
                updated_by: role_data.UpdatedBy,
            }
        } catch (error) {
            Logger.error(error)
        }
    };

    async findPermissionByEmailUser(email: string): Promise<Array<string>> {
        try {
            let listPermissionsOfUser = [];
            const user = await this.userModel.findOne({ Email: email });
            const roleOfUser = await this.roleModel.findById({ _id: user.Role._id }, { IsDeleted: false });
            roleOfUser.Permissions.forEach(permission => {
                listPermissionsOfUser.push(Object.values(permission)[0])
            });
            return listPermissionsOfUser;
        } catch (error) {
            Logger.error(error)
        }
    }

    async create(dto: Role_CreateDTO): Promise<Message_Response> {
        try {
            const checkIdRole = await this.roleModel.exists({ _id: dto.id });
            const checkNameRole = await this.roleModel.exists({ Name: dto.name });
            if (checkIdRole) {
                throw new HttpException({ status: "error", message: 'Role id already exists', title: "Errors" }, HttpStatus.BAD_REQUEST)
            }
            if (checkNameRole) {
                throw new HttpException({ status: "error", message: 'Role name already exists', title: "Errors" }, HttpStatus.BAD_REQUEST)
            }
            const role: Role = {
                _id: dto.id,
                Name: dto.name,
                Permissions: dto.permissions,
                CreatedAt: new Date(),
                CreatedBy: dto.created_by,
                UpdatedAt: new Date(),
                UpdatedBy: null,
                IsDeleted: false,
            }
            await new this.roleModel(role).save();
            const message_response: Message_Response = {
                status: "success",
                title: "Succes",
                message: "Create role successfully"
            }
            return message_response;
        } catch (error) {
            Logger.error(error)
        }
    };

    async update(dto: Role_UpdateDTO): Promise<Message_Response> {
        try {
            const currentRole = await this.findOne(dto.id);
            const arrayPermissions = currentRole.permissions;
            const permission: string = '@Permission/' + dto.module + '/' + dto.permission;

            for (let i = 0; i < APP_CONSTANT_PERMISSIONS.length; i++) {
                if (APP_CONSTANT_PERMISSIONS[i].id === permission) {
                    if (dto.action) {
                        arrayPermissions.push(APP_CONSTANT_PERMISSIONS[i])
                    } else {
                        const array: Permission[] = arrayPermissions.map((item: Permission) => ({
                            id: item.id,
                            name: item.name,
                        }));
                        arrayPermissions.splice(array.map(item => item.id).indexOf(APP_CONSTANT_PERMISSIONS[i].id), 1);
                    }
                }
            }
            const role: Role = {
                _id: currentRole.id,
                Name: currentRole.name,
                Permissions: arrayPermissions,
                CreatedAt: currentRole.created_at,
                CreatedBy: currentRole.created_by,
                UpdatedAt: new Date(),
                UpdatedBy: currentRole.updated_by,
                IsDeleted: false
            }
            this.userService.updateRoleInUser(role.Name, role);
            await this.roleModel.updateOne({ _id: currentRole.id }, { $set: role });


            const message_response: Message_Response = {
                status: "success",
                title: "Succes",
                message: "Update role successfully"
            }
            return message_response;
        } catch (error) {
            Logger.error(error)
        }
    };

    async delete(id: string): Promise<Message_Response> {
        try {
            const currentRole = await this.findOne(id);
            await this.roleModel.findOneAndUpdate({ _id: id }, { IsDeleted: true });
            const message_response: Message_Response = {
                status: "success",
                title: "Succes",
                message: "Delete role successfully"
            }
            return message_response;
        } catch (error) {
            Logger.error(error)
        }
    };
}
