import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsConfig } from './config/cors.config';
import { INestApplication } from '@nestjs/common';
import { Server as TServer } from 'http';

async function bootstrap() {
  const app: INestApplication<TServer> =
    await NestFactory.create<INestApplication<TServer>>(AppModule);
  const PORT = process.env.PORT || 3002;

  app.enableCors(CorsConfig.init());

  await app.listen(PORT, () => console.info(`Listening on port ${PORT}`));
}
bootstrap();
