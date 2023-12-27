import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as config from 'config';
import { setupSwagger } from './configs/setUpSwagger';
import { GlobalExceptionFilter } from './exception/GlobalException.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new GlobalExceptionFilter());

  const serverConfig = config.get('server');
  const port = serverConfig.port;
  setupSwagger(app);

  await app.listen(port);
}

bootstrap();
