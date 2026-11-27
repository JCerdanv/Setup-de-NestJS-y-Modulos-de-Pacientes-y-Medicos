// src/auth/dto/login.dto.ts

import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  ecorreo: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
