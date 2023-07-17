import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type UserDocument = HydratedDocument<Upload>;

@Schema({ versionKey: false })
export class Upload {

    @Prop()
    _id?: Types.ObjectId;

    @Prop()
    OriginalName: string;

    @Prop()
    NewName: string;

    @Prop()
    CreatedAt: Date;

    @Prop()
    TypeFile: string;
}

export const UploadSchema = SchemaFactory.createForClass(Upload);