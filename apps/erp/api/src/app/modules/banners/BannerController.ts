import { Body, Controller, Delete, Get, Post, Put, Query, UseGuards } from "@nestjs/common";
import { BannerService } from "./BannerService";
import { BannerEndpoints, Banner_DeleteDTO, Banner_FindDTO, Banner_FindOneDTO, Banner_InfoDetailDTO, Banner_InfoItemDTO, Banner_UpsertDTO, Message_Response, PaginationResultDTO } from "@global-victory/erp/api-interfaces";
import { PaginationUtil } from "../../utils";
import { RequirePermission } from "../../auth/decorator/RolesDecorator";
import { RolesGuard } from "../../auth/guard/RolesGuard";
import { Permission } from "libs/erp/api-interfaces/src/utils/Enum";

@Controller()
export class BannerController {

    constructor(private bannerService: BannerService) { }

    @UseGuards(RolesGuard)
    @RequirePermission(Permission.BANNER_VIEW)
    @Get(BannerEndpoints.Find)
    async find(@Query() payload: Banner_FindDTO): Promise<PaginationResultDTO<Banner_InfoItemDTO>> {
        const { _keyword } = payload;
        const { page, limit } = PaginationUtil.parseFromDTO(payload);
        const result = await this.bannerService.find(payload);

        return PaginationUtil.transformToPaginationResult<Banner_InfoItemDTO>(
            result.result,
            page,
            limit,
            result._total
        )

    }

    @UseGuards(RolesGuard)
    @RequirePermission(Permission.BANNER_VIEW)
    @Get(BannerEndpoints.FindOne)
    async findOne(@Query() payload: Banner_FindOneDTO): Promise<Banner_InfoDetailDTO> {
        return await this.bannerService.findOne(payload.id);
    };

    @UseGuards(RolesGuard)
    @RequirePermission(Permission.BANNER_CREATE)
    @Post(BannerEndpoints.Create)
    async create(@Body() payload: Banner_UpsertDTO): Promise<Message_Response> {

        return await this.bannerService.create({
            banner_name: payload.banner_name,
            banner_paragraph: payload.banner_paragraph,
            banner_image_url: payload.banner_image_url,
            pin_top: payload.pin_top,
            created_by: payload.created_by
        })
    }

    @UseGuards(RolesGuard)
    @RequirePermission(Permission.BANNER_UPDATE)
    @Put(BannerEndpoints.Update)
    async update(@Body() payload: Banner_UpsertDTO): Promise<Message_Response> {

        return await this.bannerService.update({
            id: payload.id,
            banner_name: payload.banner_name,
            banner_paragraph: payload.banner_paragraph,
            banner_image_url: payload.banner_image_url,
            pin_top: payload.pin_top,
            updated_by: payload.updated_by
        })
    }

    @UseGuards(RolesGuard)
    @RequirePermission(Permission.BANNER_DELETE)
    @Delete(BannerEndpoints.Delete)
    async delete(@Query() idBanner: Banner_DeleteDTO): Promise<Message_Response> {
        return await this.bannerService.delete(idBanner.id);
    }
}