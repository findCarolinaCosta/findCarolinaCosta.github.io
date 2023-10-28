import { Module } from '@nestjs/common';
import { PortfolioController } from './portfolio.controller';
import { PortfolioService } from './portfolio.service';

@Module({
  imports: [],
  controllers: [PortfolioController],
  providers: [PortfolioService],
  exports: [],
})
export class PortfolioModule {}
