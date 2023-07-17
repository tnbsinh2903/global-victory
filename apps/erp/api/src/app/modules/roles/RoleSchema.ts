import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type RoleDocument = HydratedDocument<Role>
@Schema({ versionKey: false })
export class Role {

    @Prop()
    _id: string;

    @Prop()
    Name: string;

    @Prop()
    Permissions: Array<Object>;

    @Prop()
    CreatedAt: Date;

    @Prop()
    CreatedBy: string;

    @Prop()
    UpdatedAt: Date;

    @Prop()
    UpdatedBy: string;

    @Prop()
    IsDeleted: boolean;
}

export const RoleSchema = SchemaFactory.createForClass(Role);
