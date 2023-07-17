import { IsEmail } from 'class-validator';
import { User_ResponseLogin } from '../modules';

export class Auth_SignInDTO {
  // @IsEmail()
  email!: string;

  password!: string;
}

export type Auth_Response = {
  user: User_ResponseLogin,
  access_token: string,
  refresh_token: string
  permissions: Array<string>,
}
