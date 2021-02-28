import {
  ArgumentsHost,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  UnprocessableEntityException,
  ValidationPipe,
} from '@nestjs/common';
import { MainModule } from './main.module';
import { NestFactory } from '@nestjs/core';
import { Response } from 'express';
import dotenv from 'dotenv';

// load .env
dotenv.config();

// Custom message error
export class ErrorExceptionFilter implements ExceptionFilter<UnprocessableEntityException> {
  public catch(exception: Error, host: ArgumentsHost) {
    let statusCode = 500;
    let message = exception.message;
    const ctx = host.switchToHttp();
    const response = ctx.getResponse() as Response;

    if (exception instanceof HttpException) {
      statusCode = exception.getStatus();

      if (exception instanceof UnprocessableEntityException) {
        message = (exception.getResponse() as any).message;
      }
    }

    response.status(statusCode).json({
      status: false,
      message: message,
      data: null,
    });
  }
}

async function bootstrap() {
  const app = await NestFactory.create(MainModule);
  const port = process.env.PORT || 9000;

  // Validation
  app.useGlobalPipes(
    new ValidationPipe({
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
    })
  );

  app.useGlobalFilters(new ErrorExceptionFilter());
  await app.listen(port);
}

bootstrap();
