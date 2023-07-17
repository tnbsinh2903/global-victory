import { Body, Controller, Delete, Get, Post, Put, Query, UseGuards } from "@nestjs/common";
import { NewsService } from "./NewsService";
import { NewsEndpoints,
         News_DeleteDTO, 
         News_FindDTO, 
         News_FindOneDTO, 
         News_InfoDetailDTO, 
         News_InfoItemDTO, 
         News_UpsertDTO, 
         PaginationResultDTO } from "@global-victory/erp/api-interfaces"
import { PaginationUtil } from "../../utils";
import { Message_Response } from "libs/erp/api-interfaces/src/utils";
import { RequirePermission } from "../../auth/decorator/RolesDecorator";
import { RolesGuard } from "../../auth/guard/RolesGuard";
import { Permission } from "libs/erp/api-interfaces/src/utils/Enum";

@Controller()
export class NewsController {
    constructor(
        private newsService: NewsService,
    ) { };

    @UseGuards(RolesGuard)
    @RequirePermission(Permission.NEWS_VIEW)
    @Get(NewsEndpoints.Find)
    async find(
        @Query() payload: News_FindDTO
    ): Promise<PaginationResultDTO<News_InfoItemDTO>> {

        const { _keyword: keyword } = payload;

        const { page, limit } = PaginationUtil.parseFromDTO(payload);

        if ((payload._sortField === 'null') && (payload._filterField === 'null')) {
            const result = await this.newsService.find(payload);

            return PaginationUtil.transformToPaginationResult<News_InfoItemDTO>(
                result.result,
                page,
                limit,
                result._total,
            )
        }
        if (payload._sortField) {
            const result = await this.newsService.findWithSort(payload);
            return PaginationUtil.transformToPaginationResult<News_InfoItemDTO>(
                result.result,
                page,
                limit,
                result._total,
            )
        }
        if (payload._filterField) {
            const result = await this.newsService.findWithFilter(payload);
            return PaginationUtil.transformToPaginationResult<News_InfoItemDTO>(
                result.result,
                page,
                limit,
                result._total,
            )
        }
    };

    // @UseGuards(RolesGuard)
    // @RequirePermission(Permission.NEWS_VIEW)
    @Get(NewsEndpoints.FindOne)
    async findOne(@Query() payload: News_FindOneDTO): Promise<News_InfoDetailDTO> {
        return await this.newsService.findOne(payload.id);
    };

    @UseGuards( RolesGuard)
    @RequirePermission(Permission.NEWS_CREATE)
    @Post(NewsEndpoints.Create)
    async create(@Body() payload: News_UpsertDTO): Promise<Message_Response> {
        const newsCreate: News_UpsertDTO = {
            title: payload.title,
            description: payload.description,
            rich_text_content: payload.rich_text_content,
            hash_tag: payload.hash_tag,
            image_cover_url: payload.image_cover_url,
            pinned_top: payload.pinned_top,
            created_at: payload.created_at,
            created_by: payload.created_by,
            updated_at: payload.updated_at,
            updated_by: payload.updated_by,
        }
        return await this.newsService.create(newsCreate);
    };

    @UseGuards( RolesGuard)
    @RequirePermission(Permission.NEWS_UPDATE)
    @Put(NewsEndpoints.Update)
    async update(@Body() payload: News_UpsertDTO): Promise<Message_Response> {
        const newsUpdate: News_UpsertDTO = {
            id: payload.id,
            title: payload.title,
            description: payload.description,
            rich_text_content: payload.rich_text_content,
            hash_tag: payload.hash_tag,
            image_cover_url: payload.image_cover_url,
            pinned_top: payload.pinned_top,
            created_at: payload.created_at,
            created_by: payload.created_by,
            updated_at: payload.updated_at,
            updated_by: payload.updated_by,
        }
        return await this.newsService.update(newsUpdate)
    };

    @UseGuards( RolesGuard)
    @RequirePermission(Permission.NEWS_DELETE)
    @Delete(NewsEndpoints.Delete)
    async delete(@Query() payload: News_DeleteDTO): Promise<Message_Response> {
        return await this.newsService.delete(payload.id);
    };
}