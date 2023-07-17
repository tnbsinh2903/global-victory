import { BaseMessageResponse, PaginationResultDTO, User_FindDTO, User_InfoDetailDTO } from '@global-victory/erp/api-interfaces';
import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User } from './UserSchema';
import bcrypt from 'bcrypt';
import { PATH_AVATAR_DEFAULT } from '../../../../../../../libs/erp/api-interfaces/src/_shared/pathFile';
import { REGEXP_ADDRESS, REGEXP_EMAIL, REGEXP_LETTER, REGEXP_PASSWORD, REGEXP_PHONE } from './../../utils/ValidateUtil';
import { Role } from '../roles/RoleSchema';

type UserDefined = {
  id?: string;
  display_name: string;
  first_name: string;
  last_name: string;
  middle_name: string;
  email: string;
  date_of_birth: Date;
  age?: number;
  address: string;
  phone: string;
  role?: string;
  avatar_url: string;
  created_at?: Date;
  updated_at?: Date;
  password?: string;
  isDeleted?: boolean;
  created_by?: string;
  updated_by?: string;
};

@Injectable()
export class UserService {

  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Role.name) private roleModel: Model<Role>,
    ) { }

  async find(dto: User_FindDTO): Promise<PaginationResultDTO<User_InfoDetailDTO>> {

    try {

      const { _page, _limit, _keyword } = dto;

      const regex = new RegExp([".*", _keyword, ".*"].join(""), "i");

      const conditions = _keyword ? {
        $and: [
          {
            $or: [
              { Email: regex },
              { DisplayName: regex },
              { Phone: new RegExp(_keyword) }
            ]
          },
          { IsDeleted: false }
        ]
      } : null;

      const totals: number = await this.userModel.count(conditions ? conditions : { IsDeleted: false })

      const raw_data: User[] = await this.userModel.find(conditions ? conditions : { IsDeleted: false }).skip((_page - 1) * _limit).limit(_limit).exec();

      const users: User_InfoDetailDTO[] = raw_data.map((user_data: User) => ({
        id: user_data._id.toString(),
        display_name: user_data.DisplayName,
        first_name: user_data.FristName,
        last_name: user_data.LastName,
        middle_name: user_data.MiddleName,
        email: user_data.Email,
        date_of_birth: user_data.DateOfBirth,
        address: user_data.Address,
        phone: user_data.Phone,
        avatar_url: user_data.AvatarUrl,
        created_at: user_data.CreatedAt,
        updated_at: user_data.UpdatedAt,
        created_by: user_data.CreatedBy,
        isDeleted: user_data.IsDeleted,
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
    }
    catch (error) {
      Logger.error(error)
    }
  }

  async findOne(email: string): Promise<UserDefined> {

    try {
      const userDetail = await this.userModel.findOne({ 'Email': email });

      return {
        id: userDetail._id.toString(),
        display_name: userDetail.DisplayName,
        first_name: userDetail.FristName,
        last_name: userDetail.LastName,
        middle_name: userDetail.MiddleName,
        email: userDetail.Email,
        date_of_birth: userDetail.DateOfBirth,
        address: userDetail.Address,
        phone: userDetail.Phone,
        role: userDetail.Role.Name,
        avatar_url: userDetail.AvatarUrl,
        created_at: userDetail.CreatedAt,
        updated_at: userDetail.UpdatedAt,
        created_by: userDetail.CreatedBy,
        updated_by: userDetail.UpdatedBy
      };
    } catch (error) {
      Logger.error(error)
    }
  }

  async create(dto: UserDefined): Promise<BaseMessageResponse> {

    try {

      const checkEmail = await this.userModel.exists({ 'Email': dto.email });
      const checkPhone = await this.userModel.exists({ 'Phone': dto.phone });

      const getRole = await this.roleModel.findOne({ 'Name': dto.role }).select('-IsDeleted -CreatedAt -UpdatedAt -CreatedBy -UpdatedBy').exec()


      if (checkEmail && checkPhone) {
        throw new HttpException({ status: "error", message: 'Email and Phone number already exists', title: "Errors" }, HttpStatus.BAD_REQUEST);
      } else {
        if (checkEmail) {
          throw new HttpException({ status: "error", message: 'Email already exists', title: "Errors" }, HttpStatus.BAD_REQUEST)
        }
        if (checkPhone) {
          throw new HttpException({ status: "error", message: 'Phone number already exists', title: "Errors" }, HttpStatus.BAD_REQUEST)
        }

        if (!REGEXP_LETTER.test(dto.display_name)) {
          throw new HttpException({ status: "error", message: 'Invalid DisplayName !', title: "Errors" }, HttpStatus.BAD_REQUEST);
        }
        if (!REGEXP_LETTER.test(dto.first_name)) {
          throw new HttpException({ status: "error", message: 'Invalid FirstName !', title: "Errors" }, HttpStatus.BAD_REQUEST);
        }
        if (!REGEXP_LETTER.test(dto.last_name)) {
          throw new HttpException({ status: "error", message: 'Invalid LastName !', title: "Errors" }, HttpStatus.BAD_REQUEST);
        }
        if (!REGEXP_LETTER.test(dto.middle_name)) {
          throw new HttpException({ status: "error", message: 'Invalid MiddleName !', title: "Errors" }, HttpStatus.BAD_REQUEST);
        }
        if (!REGEXP_EMAIL.test(dto.email)) {
          throw new HttpException({ status: "error", message: 'Invalid Email !', title: "Errors" }, HttpStatus.BAD_REQUEST);
        }
        if (dto.address) {
          if (!REGEXP_ADDRESS.test(dto.address)) {
            throw new HttpException({ status: "error", message: 'Invalid Address !', title: "Errors" }, HttpStatus.BAD_REQUEST);
          }
        }
        if (!REGEXP_PHONE.test(dto.phone)) {
          throw new HttpException({ status: "error", message: 'Invalid Phone !', title: "Errors" }, HttpStatus.BAD_REQUEST);
        }
        if (!REGEXP_PASSWORD.test(dto.password)) {
          throw new HttpException({ status: "error", message: 'Invalid PassWord !', title: "Errors" }, HttpStatus.BAD_REQUEST);
        }


        const salt = await bcrypt.genSalt(10);
        const hash_password = await bcrypt.hash(dto.password, salt);
        dto.password = hash_password;


        const entity: User = {
          _id: new Types.ObjectId(),
          DisplayName: dto.display_name,
          Password: dto.password,
          FristName: dto.first_name,
          LastName: dto.last_name,
          MiddleName: dto.middle_name,
          Email: dto.email,
          DateOfBirth: dto.date_of_birth,
          Address: dto.address,
          Phone: dto.phone,
          AvatarUrl: dto.avatar_url || PATH_AVATAR_DEFAULT,
          Role: getRole,
          CreatedAt: new Date(),
          UpdatedAt: new Date(),
          IsDeleted: false,
          CreatedBy: dto.created_by,
          UpdatedBy: dto.updated_by,
          RefreshToken: ''
        };

        await new this.userModel(entity).save();

        return {
          status: "success",
          message: "Create User Successfuly ",
          title: "Success"
        }
      }
    } catch (error) {
      Logger.error(error)
    }
  }

  async update(data: UserDefined): Promise<BaseMessageResponse> {

    try {
      const user = await this.findOne(data.email);

      const checkEmail = await this.userModel.exists({ 'Email': data.email });
      const checkPhone = await this.userModel.exists({ 'Phone': data.phone });
      const passWordMath = await this.userModel.findOne({ 'Email': data.email });
      const getRefreshToken = await this.userModel.findOne({ 'Email': data.email });
      const getRole = await this.roleModel.findOne({ 'Name': data.role }).select('-IsDeleted -CreatedAt -UpdatedAt -CreatedBy -UpdatedBy').exec()

      if (user.email != data.email) {
        if (checkEmail) {
          throw new HttpException({ status: "Errors", message: 'Email already exists', title: "Errors" }, HttpStatus.BAD_REQUEST);
        }
      }
      if (user.phone != data.phone) {
        if (checkPhone) {
          throw new HttpException({ status: "Errors", message: 'Phone already exists', title: "Errors" }, HttpStatus.BAD_REQUEST);
        }
      }

      if (!REGEXP_LETTER.test(data.display_name)) {
        throw new HttpException({ status: "Error", message: 'Invalid DisplayName !', title: "Errors" }, HttpStatus.BAD_REQUEST);
      }
      if (!REGEXP_LETTER.test(data.first_name)) {
        throw new HttpException({ status: "Error", message: 'Invalid FirstName !', title: "Errors" }, HttpStatus.BAD_REQUEST);
      }
      if (!REGEXP_LETTER.test(data.last_name)) {
        throw new HttpException({ status: "Error", message: 'Invalid LastName !', title: "Errors" }, HttpStatus.BAD_REQUEST);
      }
      if (!REGEXP_LETTER.test(data.middle_name)) {
        throw new HttpException({ status: "Error", message: 'Invalid MiddleName !', title: "Errors" }, HttpStatus.BAD_REQUEST);
      }
      if (!REGEXP_EMAIL.test(data.email)) {
        throw new HttpException({ status: "Error", message: 'Invalid Email !', title: "Errors" }, HttpStatus.BAD_REQUEST);
      }
      if (data.address) {
        if (!REGEXP_ADDRESS.test(data.address)) {
          throw new HttpException({ status: "Error", message: 'Invalid Address !', title: "Errors" }, HttpStatus.BAD_REQUEST);
        }
      }
      if (!REGEXP_PHONE.test(data.phone)) {
        throw new HttpException({ status: "Error", message: 'Invalid Phone !', title: "Errors" }, HttpStatus.BAD_REQUEST);
      }
      if (data.password) {
        if (!REGEXP_PASSWORD.test(data.password)) {
          throw new HttpException({ status: "Error", message: 'Invalid PassWord !', title: "Errors" }, HttpStatus.BAD_REQUEST);
        }
        const salt = await bcrypt.genSalt(10);
        const hash_password = await bcrypt.hash(data.password, salt);
        data.password = hash_password;
      }


      const entity: User = {
        _id: new Types.ObjectId(user.id),
        DisplayName: data.display_name,
        FristName: data.first_name,
        LastName: data.last_name,
        MiddleName: data.middle_name,
        Email: data.email,
        DateOfBirth: data.date_of_birth,
        Address: data.address,
        Phone: data.phone,
        AvatarUrl: data.avatar_url,
        Role: getRole,
        Password: data.password == null ? passWordMath.Password : data.password,
        CreatedAt: data.created_at,
        UpdatedAt: new Date(),
        IsDeleted: false,
        CreatedBy: data.created_by,
        UpdatedBy: data.updated_by,
        RefreshToken: getRefreshToken.RefreshToken
      }

      await this.userModel.updateOne({ _id: new Types.ObjectId(user.id), }, { $set: entity });
      return {
        status: "success",
        message: "Update User Successfully",
        title: "Success"
      }


    } catch (error) {
      Logger.error(error)
    }
  }

  async delete(user_email: string): Promise<BaseMessageResponse> {

    try {
      const userDetail = await this.findOne(user_email);
      await this.userModel.findOneAndUpdate({ _id: new Types.ObjectId(userDetail.id) }, { IsDeleted: true })
      return {
        status: "success",
        message: "Delete User Successfully",
        title: "Success"
      }
    } catch (error) {
      Logger.error(error)
    }
  }

  async updateRoleInUser(idRole: string, updatedRole: Role): Promise<void> {
    try {
      const users = await this.userModel.find({ 'Role.Name': idRole });
      if (users.length > 0) {
        const updatePromises = users.map(async (user) => {
          user.Role = updatedRole;
          await user.save();
        });

        await Promise.all(updatePromises);
      }
    } catch (error) {
      Logger.error(error);
    }
  }

  async updateRefreshTokenUser(email: string, refreshToken: string) {
    try {
      const user = await this.userModel.updateOne({ 'Email': email }, { $set: { 'RefreshToken': refreshToken } });
      return user;
    } catch (error) {
      Logger.error(error)
    }
  }
}




