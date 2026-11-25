// src/pacientes/pacientes.service.ts

import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePacienteDto } from './dto/create-paciente.dto';
import { UpdatePacienteDto } from './dto/update-paciente.dto';

@Injectable()
export class PacientesService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.paciente.findMany();
  }

  findOne(id: number) {
    return this.prisma.paciente.findUnique({
      where: { id },
    });
  }

  create(data: CreatePacienteDto) {
    if (new Date(data.fechaNacimiento) > new Date()) {
      throw new BadRequestException(
        'La fecha de nacimiento no puede ser futura',
      );
    }

    return this.prisma.paciente.create({
      data: {
        ...data,
        fechaNacimiento: new Date(data.fechaNacimiento),
      },
    });
  }

  update(id: number, data: UpdatePacienteDto) {
    if (data.fechaNacimiento && new Date(data.fechaNacimiento) > new Date()) {
      throw new BadRequestException(
        'La fecha de nacimiento no puede ser futura',
      );
    }

    return this.prisma.paciente.update({
      where: { id },
      data: {
        ...data,
        ...(data.fechaNacimiento && {
          fechaNacimiento: new Date(data.fechaNacimiento),
        }),
      },
    });
  }

  remove(id: number) {
    return this.prisma.paciente.delete({
      where: { id },
    });
  }
}
