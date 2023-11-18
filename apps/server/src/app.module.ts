import { Module } from '@nestjs/common';
import { AppImports } from './shared/constants/app.imports';
import { AppProviders } from './shared/constants/app.provider';

@Module({
  imports: AppImports,
  providers: AppProviders,
})
export class AppModule {}
