import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication): void {
  const options = new DocumentBuilder()
    .setTitle('Come Pet Home API Docs')
    .setDescription('Come Pet Home service API Docs')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  // ~/api-docs로 경로 지정
  SwaggerModule.setup('api-docs', app, document);
}
