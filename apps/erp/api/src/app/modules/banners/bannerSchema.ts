import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type BannerDocument = HydratedDocument<Banner>;

@Schema({ versionKey: false })
export class Banner {
    @Prop()
    _id?: Types.ObjectId;

    @Prop()
    BannerName: string;

    @Prop()
    BannerParagraph: string;

    @Prop()
    BannerImageURL: string;

    @Prop({ default: false })
    Pintop: boolean;

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

export const BannerSchema = SchemaFactory.createForClass(Banner);