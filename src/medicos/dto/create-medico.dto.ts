// src/medicos/dto/create-medico.dto.ts

import {
  IsEmail,
  IsInt, 
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreateMedicoDto {
  @IsString()
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  nombre: string;

  @IsString()
  @IsNotEmpty({ message: 'El apellido es obligatorio' })
  apellido: string;

  @IsString()
  @IsNotEmpty({ message: 'El CMP es obligatorio' })
  cmp: string;

  @IsString()
  @IsNotEmpty({ message: 'El teléfono es obligatorio' })
  phone_number: string;

  @IsEmail({}, { message: 'El correo no tiene un formato válido' })
  @IsNotEmpty({ message: 'El correo es obligatorio' })
  ecorreo: string;


  @IsInt({ message: 'El ID de especialidad debe ser un número entero' })
  @IsNotEmpty({ message: 'La especialidad es obligatoria'}) 
  specialtyId: number;

}

