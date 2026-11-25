// src/pacientes/pacientes.service.ts

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

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

  create(data: Prisma.PacienteCreateInput) {
    return this.prisma.paciente.create({
      data: {
        ...data,
        fechaNacimiento: new Date(data.fechaNacimiento),
      },
    });
  }

  update(id: number, data: Prisma.PacienteUpdateInput) {
    return this.prisma.paciente.update({
      where: { id },
      data: {
        ...data,
        ...(data.fechaNacimiento && {
          fechaNacimiento: new Date(data.fechaNacimiento as string),
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
