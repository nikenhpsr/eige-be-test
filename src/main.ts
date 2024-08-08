import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { InitialDataSeed } from './database/seeds/seed';
import { ErrorHandlingMiddleware } from './middleware/error-handling.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new ErrorHandlingMiddleware());

  const config = new DocumentBuilder()
    .setTitle('Library API')
    .setDescription('API for managing a library system')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const seeder = app.get(InitialDataSeed);
  await seeder.seed();

  await app.listen(3000);
}
bootstrap();
