import { Module } from '@nestjs/common';
import { AppImports } from './shared/constants/app.imports';

@Module({
  imports: AppImports,
})
export class AppModule {}
