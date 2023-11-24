import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication } from '@nestjs/common';
import { Server as TServer } from 'http';
import { SwaggerConfig } from 'config/Swagger.config';

async function bootstrap() {
  const app: INestApplication<TServer> =
    await NestFactory.create<INestApplication<TServer>>(AppModule);
  const PORT = process.env.PORT || 3002;

  SwaggerConfig.init(app);

  await app.listen(PORT, () => console.info(`Listening on port ${PORT}`));
}
bootstrap();
