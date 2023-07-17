import {
  BaseMessageResponse,
  PaginationResultDTO,
  UserEndpoints,
  User_DeleteDTO,
  User_FindDTO,
  User_FindOneDTO,
  User_InfoDetailDTO,
  User_InfoItemDTO,
  User_UpsertDTO,
} from '@global-victory/erp/api-interfaces';
import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { PaginationUtil } from '../../utils';
import { UserService } from './UserService';
import { Permission, Role } from 'libs/erp/api-interfaces/src/utils/Enum'
import { RolesGuard } from '../../auth/guard/RolesGuard';
import { RequirePermission } from '../../auth/decorator/RolesDecorator';
import { Request } from 'express';

@Controller()
export class UserController {

  constructor(private userService: UserService) { }

  @UseGuards(RolesGuard)
  @RequirePermission(Permission.USER_VIEW)
  @Get(UserEndpoints.Find)
  async find(
    @Query() payload: User_FindDTO, @Req() req: Request
  ): Promise<PaginationResultDTO<User_InfoItemDTO>> {
    const { _keyword: keyword } = payload;
    const { page, limit } = PaginationUtil.parseFromDTO(payload);
    const result = await this.userService.find(payload);

    return PaginationUtil.transformToPaginationResult<User_InfoItemDTO>(
      result.result,
      page,
      limit,
      result._total,
    );
  };

  @Get(UserEndpoints.FindOne)
  async findOne(@Query() payload: User_FindOneDTO): Promise<User_InfoDetailDTO> {

    const result = await this.userService.findOne(payload.email);

    return {
      display_name: result.display_name,
      first_name: result.first_name,
      last_name: result.last_name,
      middle_name: result.middle_name,
      email: result.email,
      date_of_birth: result.date_of_birth,
      address: result.address,
      phone: result.phone,
      avatar_url: result.avatar_url,
      created_at: result.created_at,
      updated_at: result.updated_at,
      created_by: result.created_by,
      updated_by: result.updated_by,
      role: result.role,
    };
  };

  @UseGuards(RolesGuard)
  @RequirePermission(Permission.USER_CREATE)
  @Post(UserEndpoints.Create)
  async create(@Body() payload: User_UpsertDTO): Promise<BaseMessageResponse> {

    return await this.userService.create({
      display_name: payload.display_name,
      first_name: payload.first_name,
      last_name: payload.last_name,
      middle_name: payload.middle_name,
      email: payload.email,
      date_of_birth: payload.date_of_birth,
      address: payload.address,
      phone: payload.phone,
      avatar_url: payload.avatar_url,
      role: payload.role,
      password: payload.password,
      created_at: payload.created_at,
      updated_at: payload.updated_at,
      created_by: payload.created_by,
    });

  };

  @UseGuards(RolesGuard)
  @RequirePermission(Permission.USER_UPDATE)
  @Put(UserEndpoints.Update)
  async update(@Body() payload: User_UpsertDTO): Promise<BaseMessageResponse> {
    return await this.userService.update({
      id: payload.id,
      display_name: payload.display_name,
      first_name: payload.first_name,
      last_name: payload.last_name,
      middle_name: payload.middle_name,
      email: payload.email,
      date_of_birth: payload.date_of_birth,
      password: payload.password,
      address: payload.address,
      phone: payload.phone,
      role: payload.role,
      avatar_url: payload.avatar_url,
      created_at: payload.created_at,
      updated_at: payload.updated_at,
      updated_by: payload.updated_by,
    });
  };

  @UseGuards(RolesGuard)
  @RequirePermission(Permission.USER_DELETE)
  @Delete(UserEndpoints.Delete)
  async delete(@Query() query: User_DeleteDTO): Promise<BaseMessageResponse> {
    return await this.userService.delete(query.email);
  };
}


