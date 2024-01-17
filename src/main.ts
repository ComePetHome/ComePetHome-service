import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as config from 'config';
import { setupSwagger } from './configs/setUpSwagger';
import { GlobalExceptionFilter } from './exception/GlobalException.filter';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new GlobalExceptionFilter());

  const serverConfig = config.get('server');
  const port = serverConfig.port;
  setupSwagger(app);

  await app.listen(port);
}

bootstrap();
