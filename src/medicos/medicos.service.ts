// src/medicos/medicos.service.ts

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class MedicosService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.medico.findMany();
  }

  findOne(id: number) {
    return this.prisma.medico.findUnique({
      where: { id },
    });
  }

  create(data: Prisma.MedicoCreateInput) {
    return this.prisma.medico.create({
      data: {
        ...data,
      },
    });
  }

  update(id: number, data: Prisma.MedicoUpdateInput) {
    return this.prisma.medico.update({
      where: { id },
      data: {
        ...data,
      },
    });
  }

  remove(id: number) {
    return this.prisma.medico.delete({
      where: { id },
    });
  }
}

