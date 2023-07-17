import { News_FindDTO, News_InfoDetailDTO, News_InfoItemDTO, News_UpsertDTO, PaginationResultDTO } from "@global-victory/erp/api-interfaces";
import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Message_Response } from "libs/erp/api-interfaces/src/utils";
import { Model, Types } from "mongoose";
import { News } from "./NewsSchema";

@Injectable()
export class NewsService {

    constructor(@InjectModel(News.name) private newsModel: Model<News>) { };

    async find(dto: News_FindDTO): Promise<PaginationResultDTO<News_InfoItemDTO>> {

        try {
            const { _page, _limit, _keyword } = dto;
            const regex = new RegExp([".*", _keyword, ".*"].join(""), "i");
            const conditions = _keyword ? {
                $and: [
                    {
                        Title: regex,
                    },
                    {
                        IsDeleted: false
                    },
                ]
            } : null;

            const totals: number = await this.newsModel.count(conditions ? conditions : { IsDeleted: false });

            let raw_data: News[] = await this.newsModel.find(conditions ? conditions : { IsDeleted: false })
                .sort({ PinnedTop: -1, UpdatedAt: -1 })
                .skip((_page - 1) * _limit).limit(_limit).exec();

            const list_news: News_InfoItemDTO[] = raw_data.map((news_data: News) => (
                {
                    id: news_data._id.toString(),
                    title: news_data.Title,
                    created_at: news_data.CreatedAt,
                    updated_at: news_data.UpdatedAt,
                    hash_tag: news_data.HashTag,
                    pinned_top: news_data.PinnedTop,
                    created_by: news_data.CreatedBy,
                }))

            return {
                result: list_news,
                _total: totals,
                _page: _page,
                _limit: _limit,
                _total_page: totals / _limit,
                _next_page: _page + 1,
                _prev_page: _page - 1,
            }
        } catch (error) {
            Logger.error(error)
        }
    };

    async findOne(id: string): Promise<News_InfoDetailDTO> {
        try {
            const news_detail = await this.newsModel.findById(new Types.ObjectId(id));

            return {
                id: news_detail._id.toString(),
                title: news_detail.Title,
                description: news_detail.Description,
                rich_text_content: news_detail.RichTextContent,
                image_cover_url: news_detail.ImageCoverUrl,
                hash_tag: news_detail.HashTag,
                pinned_top: news_detail.PinnedTop,
                created_at: news_detail.CreatedAt,
                updated_at: news_detail.UpdatedAt,
                created_by: news_detail.CreatedBy,
                updated_by: news_detail.UpdatedBy,
            }
        } catch (error) {
            Logger.error(error)
        }
    };

    async create(dto: News_UpsertDTO): Promise<Message_Response> {

        try {
            if (!dto.title) {
                throw new HttpException({ status: "error", title: "Error", message: "Title not null" }, HttpStatus.BAD_REQUEST)
            }
            if (!dto.description) {
                throw new HttpException({ status: "error", title: "Error", message: "Description not null" }, HttpStatus.BAD_REQUEST)
            }
            if (!dto.rich_text_content) {
                throw new HttpException({ status: "error", title: "Error", message: "Rich text content not null" }, HttpStatus.BAD_REQUEST)
            }

            const news: News = {
                _id: new Types.ObjectId(),
                Title: dto.title,
                Description: dto.description,
                RichTextContent: dto.rich_text_content,
                ImageCoverUrl: dto.image_cover_url,
                HashTag: dto.hash_tag,
                PinnedTop: dto.pinned_top,
                CreatedBy: dto.created_by,
                CreatedAt: new Date(),
                UpdatedAt: new Date(),
                UpdatedBy: dto.updated_by,
                IsDeleted: false
            }

            await new this.newsModel(news).save();
            const message_response: Message_Response = {
                status: "success",
                title: "Succes",
                message: "Create news successfully"
            }
            return message_response;
        } catch (error) {

        }
    };

    async update(dto: News_UpsertDTO): Promise<Message_Response> {

        try {
            const news_old = await this.findOne(dto.id);
            if (!dto.title) {
                throw new HttpException({ status: "error", title: "Error", message: "Title not null" }, HttpStatus.BAD_REQUEST)
            }
            if (!dto.description) {
                throw new HttpException({ status: "error", title: "Error", message: "Description not null" }, HttpStatus.BAD_REQUEST)
            }
            if (!dto.rich_text_content) {
                throw new HttpException({ status: "error", title: "Error", message: "Rich text content not null" }, HttpStatus.BAD_REQUEST)
            }

            const news: News = {
                _id: new Types.ObjectId(news_old.id),
                Title: dto.title,
                Description: dto.description,
                RichTextContent: dto.rich_text_content,
                ImageCoverUrl: dto.image_cover_url,
                HashTag: dto.hash_tag,
                PinnedTop: dto.pinned_top,
                CreatedBy: dto.created_by,
                CreatedAt: dto.created_at,
                UpdatedAt: new Date(),
                UpdatedBy: dto.updated_by,
                IsDeleted: false
            }
            await this.newsModel.updateOne({ _id: news._id }, { $set: news })
            const message_response: Message_Response = {
                status: "success",
                title: "Succes",
                message: "Update news successfully"
            };
            return message_response;
        } catch (error) {
            Logger.error(error)
        }
    };

    async delete(id: string): Promise<Message_Response> {
        try {
            await this.newsModel.findOneAndUpdate({ _id: new Types.ObjectId(id) }, { IsDeleted: true });
            const message_response: Message_Response = {
                status: "success",
                title: "Succes",
                message: "Delete news successfully"
            };
            return message_response;
        } catch (error) {
            Logger.error(error)
        }
    };

    async findWithSort(dto: News_FindDTO): Promise<PaginationResultDTO<News_InfoItemDTO>> {

        const { _page, _limit, _sortField, _sortOrder } = dto;

        try {

            const totals: number = await this.newsModel.count({ IsDeleted: false });

            let raw_data: News[] = await this.newsModel.find({ IsDeleted: false })
                .sort(
                    _sortField === 'CreatedAt' ? { CreatedAt: _sortOrder === 'ascend' ? -1 : 1 } :
                        _sortField === 'UpdatedAt' ? { UpdatedAt: _sortOrder === 'ascend' ? -1 : 1 } :
                            { PinnedTop: _sortOrder === 'ascend' ? -1 : 1 }
                )
                .skip((_page - 1) * _limit).limit(_limit).exec();

            const list_news: News_InfoItemDTO[] = raw_data.map((news_data: News) => ({
                id: news_data._id.toString(),
                title: news_data.Title,
                created_at: news_data.CreatedAt,
                updated_at: news_data.UpdatedAt,
                hash_tag: news_data.HashTag,
                pinned_top: news_data.PinnedTop,
                created_by: news_data.CreatedBy,
            }))

            return {
                result: list_news,
                _total: totals,
                _page: _page,
                _limit: _limit,
                _total_page: totals / _limit,
                _next_page: _page + 1,
                _prev_page: _page - 1,
            }
        } catch (error) {
            Logger.error(error)
        }
    };

    async findWithFilter(dto: News_FindDTO): Promise<PaginationResultDTO<News_InfoItemDTO>> {

        try {
            const { _page, _limit, _filterField, _filterValue } = dto;
            let filters = {};
            if (_filterField !== 'HashTag') {
                if (_filterField === "CreatedAt") {
                    filters = {
                        CreatedAt: {
                            $gte: `${_filterValue[0]}:00:00:00`,
                            $lt: `${_filterValue[1]}:23:59:59`,
                        },
                    };
                }
                if (_filterField === "UpdatedAt") {
                    filters = {
                        UpdatedAt: {
                            $gte: `${_filterValue[0]}:00:00:00`,
                            $lt: `${_filterValue[1]}:23:59:59`,
                        },
                    };
                }
                if (_filterField === "PinnedTop") {
                    if (_filterValue === "true") {
                        filters = {
                            PinnedTop: true
                        };
                    } else {
                        if (_filterValue === "false") {
                            filters = {
                                PinnedTop: false
                            }
                        } else {
                            filters = {
                                $or: [
                                    { PinnedTop: true },
                                    { PinnedTop: false },
                                ]
                            }
                        }
                    }
                }
    
                const totals: number = await this.newsModel.count({ IsDeleted: false }).where(filters);
    
                let raw_data: News[] = await this.newsModel.find({ IsDeleted: false }).where(filters)
                    .sort({ UpdatedAt: -1 })
                    .skip((_page - 1) * _limit).limit(_limit).exec();
                const list_news: News_InfoItemDTO[] = raw_data.map((news_data: News) => ({
                    id: news_data._id.toString(),
                    title: news_data.Title,
                    created_at: news_data.CreatedAt,
                    updated_at: news_data.UpdatedAt,
                    hash_tag: news_data.HashTag,
                    pinned_top: news_data.PinnedTop,
                    created_by: news_data.CreatedBy,
                }))
    
                return {
                    result: list_news,
                    _total: totals,
                    _page: _page,
                    _limit: _limit,
                    _total_page: totals / _limit,
                    _next_page: _page + 1,
                    _prev_page: _page - 1,
                }
            } else {
    
                const totals: number = await this.newsModel.count({ IsDeleted: false, HashTag: { "$in": [new RegExp([".*", _filterValue, ".*"].join(""), "i")] } });
    
                let raw_data: News[] = await this.newsModel.find({ IsDeleted: false, HashTag: { "$in": [new RegExp([".*", _filterValue, ".*"].join(""), "i")] } })
                    .sort({ UpdatedAt: -1 })
                    .skip((_page - 1) * _limit).limit(_limit).exec();
                const list_news: News_InfoItemDTO[] = raw_data.map((news_data: News) => ({
                    id: news_data._id.toString(),
                    title: news_data.Title,
                    created_at: news_data.CreatedAt,
                    updated_at: news_data.UpdatedAt,
                    hash_tag: news_data.HashTag,
                    pinned_top: news_data.PinnedTop,
                    created_by: news_data.CreatedBy,
                }))
    
                return {
                    result: list_news,
                    _total: totals,
                    _page: _page,
                    _limit: _limit,
                    _total_page: totals / _limit,
                    _next_page: _page + 1,
                    _prev_page: _page - 1,
                }
            }
        } catch (error) {
            Logger.error(error)
        }       
    };
}