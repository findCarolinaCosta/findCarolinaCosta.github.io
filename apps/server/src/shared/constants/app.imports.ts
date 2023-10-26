import { ContentInfoModule } from 'src/modules/contentInfo/contentInfo.module';
import { NotionModule } from '../services/notion/notion.module';
import { RedisModule } from '../services/redis/redis.module';

export const AppImports = [NotionModule, RedisModule, ContentInfoModule];
