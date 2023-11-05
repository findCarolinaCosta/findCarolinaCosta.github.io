import { ContentInfoModule } from 'src/modules/contentInfo/contentInfo.module';
import { NotionModule } from '../services/notion/notion.module';
import { RedisModule } from '../services/redis/redis.module';
import { ContactModule } from 'src/modules/contact/contact.module';
import { HealthModule } from 'src/modules/health/health.module';
import { PortfolioModule } from 'src/modules/portfolio/portfolio.module';
import { QualificationModule } from 'src/modules/qualification/qualification.module';
import { SkillModule } from 'src/modules/skill/skill.module';
import { SolutionModule } from 'src/modules/solution/solution.module';

export const AppImports = [
  NotionModule,
  RedisModule,
  ContentInfoModule,
  ContactModule,
  HealthModule,
  PortfolioModule,
  QualificationModule,
  SkillModule,
  SolutionModule,
];
