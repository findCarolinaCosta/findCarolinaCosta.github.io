import { ContentInfoModule } from 'src/modules/contentInfo/contentInfo.module';
import { NotionModule } from '../services/notion/notion.module';
import { RedisModule } from '../services/redis/redis.module';
import { ContactModule } from 'src/modules/contact/contact.module';
import { HealthModule } from 'src/modules/health/health.module';
import { PortfolioModule } from 'src/modules/portfolio/portfolio.module';

export const AppImports = [
  NotionModule,
  RedisModule,
  ContentInfoModule,
  ContactModule,
  HealthModule,
  PortfolioModule,
];
