import { ContentInfoModule } from 'src/modules/contentInfo/contentInfo.module';
import { NotionModule } from '../services/notion/notion.module';
import { RedisModule } from '../services/redis/redis.module';
import { ContactModule } from 'src/modules/contact/contact.module';

export const AppImports = [
  NotionModule,
  RedisModule,
  ContentInfoModule,
  ContactModule,
];
