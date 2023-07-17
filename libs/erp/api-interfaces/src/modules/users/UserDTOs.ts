
import { IsEmail, IsNotEmpty, MaxLength } from 'class-validator';
import { PaginationDTO } from '../../common';
import { Role } from '../../utils/Enum';

export type User_InfoItemDTO = {
  display_name: string;
  email: string;
  phone: string
  address: string,
  avatar_url: string;
  updated_at: Date
};


export type User_ResponseLogin = {
  permissions: Array<string>,
  display_name: string;
  email: string;
  phone: string
  address: string,
  updated_at: Date,
  avatar_url: string
};

export type UserListResponse = {
  result: User_InfoItemDTO[],
  _next_page: number,
  _prev_page: number,
  _total: number,
  _total_page: number,
  _page: number,
  _limit: number,
}

export type User_InfoDetailDTO = {
  id?: string;
  display_name: string,
  email: string;
  first_name: string;
  last_name: string;
  middle_name: string;
  date_of_birth: Date;
  phone: string
  address: string,
  avatar_url: string,
  role?: string,
  created_at: Date,
  updated_at: Date,
  isDeleted?: boolean,
  created_by?: string,
  updated_by?: string,

};

export type User_CreateDTO = {
  id: string;
  display_name: string,
  email: string;
  first_name: string;
  last_name: string;
  middle_name: string;
  date_of_birth: Date;
  phone: string
  address: string,
  avatar_url: string,
  password: string,
  created_by: string,
}

export type User_Update = {
  id?: string;
  display_name: string,
  email: string;
  first_name: string;
  last_name: string;
  middle_name: string;
  date_of_birth: Date;
  phone: string
  address: string,
  avatar_url: string,
  created_at: Date,
  updated_at: Date,
  updated_by: string
}

export type BaseMessageResponse = {
  status: string;
  message: string;
  title: string;
}

export type User_FindDTO = PaginationDTO<{
  _keyword?: string;
}>;

export type User_FindOneDTO = {
  email: string;
};

export class User_UpsertDTO {

  id?: string;

  @IsNotEmpty()
  @MaxLength(20)
  display_name !: string;

  @IsEmail()
  email!: string;

  @IsNotEmpty()
  @MaxLength(20)
  first_name!: string;

  @IsNotEmpty()
  @MaxLength(20)
  last_name!: string;

  middle_name!: string;

  password!: string;

  @IsNotEmpty()
  date_of_birth!: Date;

  @IsNotEmpty()
  @MaxLength(10)
  phone!: string;

  address!: string;

  avatar_url?: string;

  role?: string;

  created_at?: Date;

  updated_at?: Date;

  updated_by?: string;

  created_by?: string;
}

export type User_DeleteDTO = {
  email: string;
};
