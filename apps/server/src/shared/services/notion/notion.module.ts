import { Global, Module } from '@nestjs/common';
import { NotionService } from './notion.service';
import { NotionClientProvider } from './notion.client.provider';

@Global()
@Module({
  providers: [NotionClientProvider, NotionService],
  exports: [NotionService],
})
export class NotionModule {}
