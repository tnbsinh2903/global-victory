import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Role } from '../roles/RoleSchema';

export type UserDocument = HydratedDocument<User>;

@Schema({ versionKey: false })
export class User {

  @Prop()
  _id?: Types.ObjectId;

  @Prop()
  DisplayName: string

  @Prop()
  FristName: string;

  @Prop()
  LastName: string;

  @Prop()
  MiddleName: string;

  @Prop()
  DateOfBirth: Date;

  @Prop()
  Address: string;

  @Prop()
  Phone: string;

  @Prop()
  AvatarUrl: string;

  @Prop()
  CreatedAt: Date;

  @Prop()
  UpdatedAt: Date;

  @Prop()
  Email: string;

  @Prop()
  Password: string;

  @Prop()
  Role: Role;

  @Prop({ default: false })
  IsDeleted: boolean

  @Prop()
  CreatedBy: string;

  @Prop()
  UpdatedBy: string;

  @Prop()
  RefreshToken: string
}

export const UserSchema = SchemaFactory.createForClass(User);
