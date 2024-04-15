import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConsoleLogger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as chalk from 'chalk';

async function bootstrap() {
  const logger = new ConsoleLogger();
  // const port = process.env.PORT || 3000;
  const port = 3000; // TODO: all params from env...
  logger.setContext('AppModule');

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
  const options = new DocumentBuilder()
    .setTitle('NestJsTest')
    .setDescription('The NestJsTest project API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  // const document = SwaggerModule.createDocument(app, options, {extraModels: [LocationGlobalModel, LocationPointModel]});
  // TODO: set swagger availability based on env
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api/docs', app, document);

  const server = await app.listen(port);
  server.setTimeout(1800000);

  const divider: string = chalk.gray('----------------------------------------------------- |');
  logger.log(divider);
  logger.log(`Service started ==> 🌎 \t\t\t\t  |`);
  logger.log(`Node:          ${process.versions.node} \t\t\t\t  |`);
  logger.log(`Platform:      ${process.env.npm_package_name} (${process.env.npm_package_version}) \t\t\t  |`);

  if ('production' !== process.env.NODE_ENV) {
    logger.log(`Localhost:     ${chalk.magenta(`http://localhost:${port}`)} \t\t  |`);

    // if ('true' === process.env.SWAGGER_ENABLED) {
    logger.log(`Swagger:       ${chalk.green(`http://localhost:${port}/api/docs`)} \t  |`);
    logger.log(`Swagger json:  ${chalk.green(`http://localhost:${port}/api/docs-json`)}    |`);
    // }
  }
  logger.log(divider);
}

bootstrap();
