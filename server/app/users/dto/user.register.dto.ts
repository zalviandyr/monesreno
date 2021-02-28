import { IsNotEmpty, IsString } from 'class-validator';

export class UserRegisterDto {
  @IsNotEmpty()
  @IsString()
  name?: string;

  @IsNotEmpty()
  username?: string;

  @IsNotEmpty()
  password?: string;
}
