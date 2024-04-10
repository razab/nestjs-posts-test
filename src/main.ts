import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      stopAtFirstError: true,
      transform: true,
      whitelist: true, // need it here for forbidNonWhitelisted to work
      forbidNonWhitelisted: true,
      // enableDebugMessages: true, // for debug only
      // validationError: { target: true, value: true }, // for debug only
      // dismissDefaultMessages: true, // doesn't seem to work
    }),
  );
  app.setGlobalPrefix('api/v1');
  await app.listen(3000);
}

bootstrap();
