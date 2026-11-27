// (src/auth/dto/register.dto.ts

import { IsEmail, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, MinLength 
        } from 'class-validator';
import { Role } from '@prisma/client';

export class RegisterDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsEmail()
  @IsNotEmpty()
  ecorreo: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsEnum(Role)
  role: Role;

  @IsInt()
  @IsOptional()
  role_id?: number;

  @IsInt()
  @IsOptional()
  doctorId?: number;
}
