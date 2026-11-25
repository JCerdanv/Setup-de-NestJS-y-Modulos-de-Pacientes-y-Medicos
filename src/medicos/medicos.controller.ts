// src/medicos/medicos.controller.ts

import { CreateMedicoDto } from './dto/create-medico.dto';
import { UpdateMedicoDto } from './dto/update-medico.dto';

import {
  Controller,
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