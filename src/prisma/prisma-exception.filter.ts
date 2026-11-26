// src/prisma/prisma-exception.filter.ts 

import { ArgumentsHost, Catch, HttpStatus, Logger } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter extends BaseExceptionFilter {
  private readonly logger = new Logger(PrismaExceptionFilter.name);

  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const cleanMessage = exception.message.replace(/\n/g, ' ');

    switch (exception.code) {
      // P2002: Violación de restricción única (ej. ecorreo, dni o cmp duplicado)
      case 'P2002': {
        const status = HttpStatus.CONFLICT; // 409
        const target =
          (exception.meta?.target as string[])?.join(', ') || 'campo único';

        response.status(status).json({
          statusCode: status,
          error: 'Conflict',
          message: `Ya existe un registro con ese valor en: ${target}.`,
        });
        break;
      }

      // P2003: Violación de llave foránea (ej. specialtyId inexistente)
      case 'P2003': {
        const status = HttpStatus.BAD_REQUEST; // 400
        const field = (exception.meta?.field_name as string) || 'relación';

        response.status(status).json({
          statusCode: status,
          error: 'Bad Request',
          message: `Referencia inválida o registro relacionado no encontrado (${field}).`,
        });
        break;
      }

      // P2025: Registro no encontrado (ej. PUT o DELETE con ID inexistente)
      case 'P2025': {
        const status = HttpStatus.NOT_FOUND; // 404

        response.status(status).json({
          statusCode: status,
          error: 'Not Found',
          message: 'El registro solicitado no existe o ya fue eliminado.',
        });
        break;
      }

      // P2000: Valor demasiado largo para la columna
      case 'P2000': {
        const status = HttpStatus.BAD_REQUEST; // 400

        response.status(status).json({
          statusCode: status,
          error: 'Bad Request',
          message: 'Uno de los valores enviados excede la longitud máxima permitida.',
        });
        break;
      }

      default: {
        this.logger.error(
          `Error de Prisma no manejado [${exception.code}]: ${cleanMessage}`,
        );
        super.catch(exception, host);
        break;
      }
    }
  }
}
