// src/auth/auth.service.ts

import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async register(dto: RegisterDto) {
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const roleIdMap = {
      RECEPCIONISTA: 1,
      MEDICO: 2,
      GERENCIA: 3,
    };

    return this.prisma.user.create({
      data: {
        name: dto.name ?? dto.ecorreo.split('@')[0],
        ecorreo: dto.ecorreo,
        password: hashedPassword,
        role: dto.role,
        role_id: dto.role_id ?? roleIdMap[dto.role],
        doctorId: dto.doctorId,
      },
      select: {
        id: true,
        name: true,
        ecorreo: true,
        role: true,
        role_id: true,
      },
    });
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { ecorreo: dto.ecorreo },
    });

    if (!user || !(await bcrypt.compare(dto.password, user.password))) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const token = jwt.sign(
      { id: user.id, ecorreo: user.ecorreo, role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: '8h' },
    );

    return { token };
  }
}
