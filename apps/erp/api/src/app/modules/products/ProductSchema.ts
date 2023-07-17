import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type ProductDocument = HydratedDocument<Product>

@Schema({ versionKey: false })
export class Product {

    @Prop()
    _id: Types.ObjectId;

    @Prop()
    ProductName: string;

    @Prop()
    ProductDensity: string;

    @Prop()
    CreatedAt: Date;

    @Prop()
    CreatedBy: string;

    @Prop()
    UpdatedAt: Date;

    @Prop()
    UpdateBy: string;

    @Prop({ default: false })
    IsDeleted: boolean;
}

export const ProductSchema = SchemaFactory.createForClass(Product);