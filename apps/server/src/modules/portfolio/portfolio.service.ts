import { NotionDatabase } from '../../shared/constants/notion.database';
import { NotionService } from '../../shared/services/notion/notion.service';
import { RedisService } from '../../shared/services/redis/redis.service';
import { plainToInstance } from 'class-transformer';
import { ProjectDto, ProjectResponseDto } from '../../dto/portfolio.dto';
import { Injectable } from '@nestjs/common';
import { Language } from '../../shared/constants/language.enum';
import { NotionReadProperties } from '../../shared/services/notion/notion.type';

@Injectable()
export class PortfolioService {
  private _databaseId: string =
    NotionDatabase.NOTION_PORTFOLIO_PROJECTS_DATABASE_ID;

  constructor(
    private readonly redisService: RedisService,
    private readonly notionService: NotionService,
  ) {}

  public async getProjects(language: Language) {
    let portfolios: ProjectDto[] | null = await this.redisService.get<
      ProjectDto[]
    >(`projects_${language}`);

    if (language === Language.PORTUGUESE)
      this._databaseId =
        NotionDatabase.NOTION_PORTFOLIO_PROJECTS_DATABASE_ID_PT_BR;

    if (!portfolios) {
      portfolios = (
        await this.notionService.read<ProjectDto>({
          databaseId: this._databaseId,
        })
      ).results.map(this.serializePortfolio);

      if (!!portfolios.length)
        this.redisService.set<ProjectDto[]>(`projects_${language}`, portfolios);
    }

    return portfolios;
  }

  public serializePortfolio({
    properties,
  }: NotionReadProperties<ProjectDto>): ProjectDto {
    return plainToInstance(ProjectResponseDto, properties);
  }
}
