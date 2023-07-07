import { IsEmail, IsString } from 'class-validator';

export class UserLoginDto {
  @IsString()
  credential: string;

  @IsString()
  password: string;
}
