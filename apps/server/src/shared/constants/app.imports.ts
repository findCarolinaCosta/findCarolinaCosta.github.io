import { ContentInfoModule } from '../../modules/contentInfo/contentInfo.module';
import { NotionModule } from '../services/notion/notion.module';
import { RedisModule } from '../services/redis/redis.module';
import { ContactModule } from '../../modules/contact/contact.module';
import { HealthModule } from '../../modules/health/health.module';
import { PortfolioModule } from '../../modules/portfolio/portfolio.module';
import { QualificationModule } from '../../modules/qualification/qualification.module';
import { SkillModule } from '../../modules/skill/skill.module';
import { SolutionModule } from '../../modules/solution/solution.module';
import { AuthModule } from '../auth/auth.module';

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
  AuthModule,
];
