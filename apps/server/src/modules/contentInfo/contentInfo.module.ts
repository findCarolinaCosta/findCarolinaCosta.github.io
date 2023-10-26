import { Module } from '@nestjs/common';
import { ContentInfoService } from './contentInfo.service';
import { ContentInfoController } from './contentInfo.controller';

@Module({
  imports: [],
  controllers: [ContentInfoController],
  providers: [ContentInfoService],
  exports: [],
})
export class ContentInfoModule {}
