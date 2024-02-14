import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication): void {
  const options = new DocumentBuilder()
    .setTitle('Come Pet Home API Docs')
    .setDescription('Come Pet Home service API Docs')
    .addBearerAuth(
      {
        name: 'access-token',
        type: 'http',
        scheme: 'Bearer',
        bearerFormat: 'JWT',
        in: 'header',
      },
      'access-token',
    )
    .build();

  const document = SwaggerModule.createDocument(app, options);

  // Manually add the 'access-token' header to the parameters
  // document.paths['/pet/api-docs'] = {
  //   get: {
  //     parameters: [
  //       {
  //         name: 'access-token',
  //         in: 'header',
  //         description: 'Access Token',
  //         required: true,
  //         schema: {
  //           type: 'string',
  //         },
  //       },
  //     ],
  //     responses: {}, // Empty responses object
  //   },
  // };

  // Add the 'access-token' header to the global security options
  document.components = {
    securitySchemes: {
      JWT: {
        type: 'apiKey',
        name: 'access-token',
        in: 'header',
      },
    },
  };
  document.security = [{ JWT: [] }];

  SwaggerModule.setup('pet/api-docs', app, document);
}
