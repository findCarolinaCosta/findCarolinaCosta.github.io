import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { SolutionDto } from '../../dto/solution.dto';
import { Language } from '../../shared/constants/language.enum';
import { NotionDatabase } from '../../shared/constants/notion.database';
import { NotionService } from '../../shared/services/notion/notion.service';
import { NotionReadProperties } from '../../shared/services/notion/notion.type';
import { RedisService } from '../../shared/services/redis/redis.service';
import { SolutionListDto } from './solution.type';

@Injectable()
export class SolutionService {
  private _databaseId: string = NotionDatabase.NOTION_SERVICE_DATABASE_ID;
  private _databaseSolutionListId: string =
    NotionDatabase.NOTION_SERVICE_LIST_DATABASE_ID;

  constructor(
    private readonly redisService: RedisService,
    private readonly notionService: NotionService,
  ) {}

  async getSolutions(language: Language) {
    let solutions: SolutionDto[] = await this.redisService.get<SolutionDto[]>(
      `solutions_${language}`,
    );

    if (!solutions) {
      if (language === Language.PORTUGUESE) {
        this._databaseId = NotionDatabase.NOTION_SERVICE_DATABASE_ID_PT_BR;
        this._databaseSolutionListId =
          NotionDatabase.NOTION_SERVICE_LIST_DATABASE_ID_PT_BR;
      }

      const { results: solutionsDto } =
        await this.notionService.read<SolutionDto>({
          databaseId: this._databaseId,
        });

      solutions = await Promise.all(solutionsDto.map(this.serializeSolutions));

      if (solutions)
        await this.redisService.set(`solutions_${language}`, solutions);
    }

    return solutions;
  }

  private serializeSolutions = async ({
    properties,
  }: NotionReadProperties<SolutionDto>): Promise<SolutionDto> => {
    properties = plainToClass(SolutionDto, properties);

    if (properties.tag) {
      properties.solutionsList = await this.getSolutionsList(properties.tag);
    }

    return {
      solutionsList: properties.solutionsList,
      title: properties.title,
    };
  };

  private getSolutionsList = async (tag: string): Promise<string[]> => {
    const { results: solutionListDto } =
      await this.notionService.read<SolutionListDto>({
        databaseId: this._databaseSolutionListId,
        filter: {
          property: 'tag',
          multi_select: {
            contains: tag,
          },
        },
      });

    return solutionListDto.map(({ properties }) => {
      const { service } = plainToClass(SolutionListDto, properties);

      return service;
    });
  };
}
