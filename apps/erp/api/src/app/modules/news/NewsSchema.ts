import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type NewsDocument = HydratedDocument<News>;

@Schema({ versionKey: false })
export class News {
    @Prop()
    _id?: Types.ObjectId;

    @Prop()
    Title: string;

    @Prop()
    Description: string;

    @Prop()
    RichTextContent: string;

    @Prop()
    HashTag: Array<string>;

    @Prop()
    ImageCoverUrl: string;

    @Prop({ default: false })
    PinnedTop: boolean;

    @Prop()
    CreatedAt: Date;

    @Prop()
    CreatedBy: string;

    @Prop()
    UpdatedAt: Date;

    @Prop()
    UpdatedBy: string;

    @Prop({ default: false })
    IsDeleted: boolean;
}

export const NewsSchema = SchemaFactory.createForClass(News);