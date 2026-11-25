// src/pacientes/dto/create-paciente.dto.ts

import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreatePacienteDto {
  @IsString()
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  nombre: string;

  @IsString()
  @IsNotEmpty({ message: 'El apellido es obligatorio' })
  apellido: string;

  @IsString()
  @IsNotEmpty({ message: 'El DNI es obligatorio' })
  dni: string;

  @IsString()
  @IsNotEmpty({ message: 'El teléfono es obligatorio' })
  phone_number: string;

  @IsEmail({}, { message: 'El correo no tiene un formato válido' })
  @IsNotEmpty({ message: 'El correo es obligatorio' })
  ecorreo: string;

  @IsDateString({}, { message: 'La fecha de nacimiento debe ser válida' })
  @IsNotEmpty({ message: 'La fecha de nacimiento es obligatoria' })
  fechaNacimiento: string;

  @IsString()
  @IsOptional()
  comentario?: string;
}
