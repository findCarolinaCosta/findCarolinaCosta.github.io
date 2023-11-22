import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppImports } from './shared/constants/app.imports';
import { AppProviders } from './shared/constants/app.provider';
import { CorsConfig } from './config/Cors.config';

@Module({
  imports: AppImports,
  providers: AppProviders,
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CorsConfig.init).forRoutes('*');
  }
}
