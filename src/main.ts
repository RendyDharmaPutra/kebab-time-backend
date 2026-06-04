import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const reflector = app.get(Reflector);
  app.useGlobalInterceptors(new ResponseInterceptor(reflector));

  app.useGlobalFilters(new HttpExceptionFilter());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,

      transformOptions: {
        enableImplicitConversion: true,
      },

      exceptionFactory: (errors) => {
        return new BadRequestException({
          code: 'VALIDATION_ERROR',
          errors: errors.map((error) => ({
            field: error.property,
            messages: Object.values(error.constraints ?? {}),
          })),
        });
      },
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
