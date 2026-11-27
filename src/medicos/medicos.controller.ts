// src/medicos/medicos.controller.ts

import { Controller, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

import { CreateMedicoDto } from './dto/create-medico.dto';
import { UpdateMedicoDto } from './dto/update-medico.dto';

import {
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  NotFoundException,
} from '@nestjs/common';
import { MedicosService } from './medicos.service';

@Controller('medicos')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('RECEPCIONISTA')
export class MedicosController {
  constructor(private readonly medicosService: MedicosService) {}

  @Get()
  findAll() {
    return this.medicosService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const medico = await this.medicosService.findOne(+id);
    if (!medico) {
      throw new NotFoundException(`Medico con ID ${id} no encontrado`);
    }
    return medico;
  }

  @Post()
  create(@Body() body: CreateMedicoDto ) {
    return this.medicosService.create(body);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: UpdateMedicoDto ) {
    return this.medicosService.update(+id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.medicosService.remove(+id);
  }
}