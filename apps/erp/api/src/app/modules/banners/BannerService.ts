import { Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Banner } from "./bannerSchema";
import { Banner_FindDTO, Banner_InfoDetailDTO, Banner_InfoItemDTO, Banner_UpsertDTO, Message_Response, PaginationResultDTO } from "@global-victory/erp/api-interfaces";
import { Types, Model } from "mongoose";

@Injectable()
export class BannerService {

    constructor(@InjectModel(Banner.name) private bannerModel: Model<Banner>) { }

    async find(dto: Banner_FindDTO): Promise<PaginationResultDTO<Banner_InfoItemDTO>> {

        try {
            const { _page, _limit, _keyword } = dto;

            const regex = new RegExp([".*", _keyword, ".*"].join(""), "i");

            const conditions = _keyword ? {
                $and: [
                    {
                        $or: [
                            { BannerName: regex }
                        ]
                    },
                    { IsDeleted: false }
                ]
            } : null;
            const totals: number = await this.bannerModel.count(conditions ? conditions : { IsDeleted: false })

            const raw_data: Banner[] = await this.bannerModel.find(conditions ? conditions : { IsDeleted: false }).sort({ CreatedAt: -1 }).skip((_page - 1) * _limit).limit(_limit).exec();

            const users: Banner_InfoItemDTO[] = raw_data.map((user_data: Banner) => ({
                id: user_data._id.toString(),
                banner_name: user_data.BannerName,
                banner_paragraph: user_data.BannerParagraph,
                banner_image_url: user_data.BannerImageURL,
                pin_top: user_data.Pintop,
                updated_at: user_data.UpdatedAt,
            }))

            return {
                result: users,
                _total: totals,
                _page: _page,
                _limit: _limit,
                _total_page: totals / _limit,
                _next_page: _page + 1,
                _prev_page: _page - 1
            };
        } catch (error) {
            Logger.error(error)
        }
    }

    async findOne(id: string): Promise<Banner_InfoDetailDTO> {

        try {
            const bannerDetail = await this.bannerModel.findById(new Types.ObjectId(id));

            return {
                id: bannerDetail._id.toString(),
                banner_name: bannerDetail.BannerName,
                banner_paragraph: bannerDetail.BannerParagraph,
                banner_image_url: bannerDetail.BannerImageURL,
                pin_top: bannerDetail.Pintop,
                created_at: bannerDetail.CreatedAt,
                created_by: bannerDetail.CreatedBy,
                updated_by: bannerDetail.UpdateBy,
                updated_at: bannerDetail.UpdatedAt
            };
        } catch (error) {
            Logger.error(error)

        }
    }

    async create(dto: Banner_UpsertDTO): Promise<Message_Response> {
        try {
            const entity: Banner = {
                _id: new Types.ObjectId(dto.id),
                BannerName: dto.banner_name,
                BannerParagraph: dto.banner_paragraph,
                BannerImageURL: dto.banner_image_url,
                Pintop: dto.pin_top,
                CreatedAt: new Date(),
                CreatedBy: dto.created_by,
                UpdatedAt: new Date(),
                UpdateBy: dto.updated_by,
                IsDeleted: dto.is_deleted,
            }

            await new this.bannerModel(entity).save();

            return {
                status: "success",
                message: "Create User Successfuly ",
                title: "Success"
            }
        } catch (error) {
            Logger.error(error)
        }
    }

    async update(dto: Banner_UpsertDTO): Promise<Message_Response> {
        try {
            const bannerUpdate = await this.findOne(dto.id);

            const entity: Banner = {
                _id: new Types.ObjectId(bannerUpdate.id),
                BannerName: dto.banner_name,
                BannerParagraph: dto.banner_paragraph,
                BannerImageURL: dto.banner_image_url,
                Pintop: dto.pin_top,
                CreatedAt: dto.created_at,
                UpdatedAt: new Date(),
                CreatedBy: dto.created_by,
                UpdateBy: dto.updated_by,
                IsDeleted: dto.is_deleted
            }

            await this.bannerModel.updateOne({ _id: new Types.ObjectId(entity._id) }, { $set: entity })

            return {
                status: "success",
                message: "Create User Successfuly ",
                title: "Succes"
            }
        } catch (error) {
            Logger.error(error)
        }
    }

    async delete(id: string): Promise<Message_Response> {
        try {
            await this.bannerModel.findOneAndUpdate({ _id: new Types.ObjectId(id) }, { $set: { IsDeleted: true } });
            return {
                status: "success",
                message: "Delete Banner Successfully",
                title: "Succes"
            }
        } catch (error) {
            Logger.error(error)
        }
    }
}