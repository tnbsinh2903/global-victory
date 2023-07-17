import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './ProductSchema';
import { Model, Types } from 'mongoose';
import { Message_Response, PaginationResultDTO, Product_FindDTO, Product_InfoDetailDTO, Product_InfoItemDTO, Product_UpsertDTO } from '@global-victory/erp/api-interfaces';

@Injectable()
export class ProductService {

    constructor(@InjectModel(Product.name) private productModel: Model<Product>) {

    }

    async find(dto: Product_FindDTO): Promise<PaginationResultDTO<Product_InfoItemDTO>> {

        try {
            const { _page, _limit, _keyword } = dto;

            const regex = new RegExp([".*", _keyword, ".*"].join(""), "i");

            const conditions = _keyword ? {
                $and: [
                    {
                        $or: [
                            { ProductName: regex }
                        ]
                    },
                    { IsDeleted: false }
                ]
            } : null;
            const totals: number = await this.productModel.count(conditions ? conditions : { IsDeleted: false })

            const raw_data: Product[] = await this.productModel.find(conditions ? conditions : { IsDeleted: false }).sort({ CreatedAt: -1 }).skip((_page - 1) * _limit).limit(_limit).exec();

            const users: Product_InfoItemDTO[] = raw_data.map((user_data: Product) => ({
                id: user_data._id.toString(),
                product_name: user_data.ProductName,
                product_density: user_data.ProductDensity,
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


    async findOne(id: string): Promise<Product_InfoDetailDTO> {

        try {
            const productDetail = await this.productModel.findById(new Types.ObjectId(id));

            return {
                id: productDetail._id.toString(),
                product_name: productDetail.ProductName,
                product_density: productDetail.ProductDensity,
                created_at: productDetail.CreatedAt,
                created_by: productDetail.CreatedBy,
                updated_by: productDetail.UpdateBy,
                updated_at: productDetail.UpdatedAt
            };
        } catch (error) {
            Logger.error(error)

        }
    }

    async create(dto: Product_UpsertDTO): Promise<Message_Response> {
        try {
            const entity: Product = {
                _id: new Types.ObjectId(dto.id),
                ProductName: dto.product_name,
                ProductDensity: dto.product_density,
                CreatedAt: new Date(),
                CreatedBy: dto.created_by,
                UpdatedAt: new Date(),
                UpdateBy: dto.updated_by,
                IsDeleted: dto.is_deleted,
            }
            await new this.productModel(entity).save();

            return {
                status: "success",
                message: "Create Product Successfuly ",
                title: "Success"
            }
        } catch (error) {
            Logger.error(error)

        }
    }

    async update(dto: Product_UpsertDTO): Promise<Message_Response> {
        try {
            const productUpdate = await this.findOne(dto.id);

            const entity: Product = {
                _id: new Types.ObjectId(productUpdate.id),
                ProductName: dto.product_name,
                ProductDensity: dto.product_density,
                CreatedAt: new Date(),
                CreatedBy: dto.created_by,
                UpdatedAt: new Date(),
                UpdateBy: dto.updated_by,
                IsDeleted: dto.is_deleted,
            }

            await this.productModel.updateOne({ _id: new Types.ObjectId(entity._id) }, { $set: entity })

            return {
                status: "success",
                message: "Create Product Successfuly ",
                title: "Succes"
            }
        } catch (error) {
            Logger.error(error)

        }
    }

    async delete(id: string): Promise<Message_Response> {
        try {
            await this.productModel.findOneAndUpdate({ _id: new Types.ObjectId(id) }, { $set: { IsDeleted: true } });
            return {
                status: "success",
                message: "Delete Product Successfully",
                title: "Succes"
            }
        } catch (error) {
            Logger.error(error)
        }
    }
}
