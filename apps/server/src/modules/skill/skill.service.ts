import { SkillDto, SkillListDto } from '../../dto/skill.dto';
import { Language } from './../../shared/constants/language.enum';
import { NotionService } from '../../shared/services/notion/notion.service';
import { RedisService } from '../../shared/services/redis/redis.service';
import { NotionReadProperties } from '../../shared/services/notion/notion.type';
import { plainToClass } from 'class-transformer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SkillService {
  private _databaseId: string = process.env.NOTION_SKILL_DATABASE_ID;
  private _databaseSkillListId: string =
    process.env.NOTION_SKILLLIST_DATABASE_ID;

  constructor(
    private readonly redisService: RedisService,
    private readonly notionService: NotionService,
  ) {}

  public async getSkills(language: Language): Promise<SkillListDto[]> {
    let skills: SkillListDto[] = null;

    try {
      skills = await this.redisService.get<SkillListDto[]>(
        `skills_${language}`,
      );
    } catch (e) {}

    if (!skills) {
      if (language === Language['pt-br']) {
        this._databaseId = process.env.NOTION_SKILL_DATABASE_ID_PT_BR;
      }

      const { results: qualificationsDto } =
        await this.notionService.read<SkillListDto>({
          databaseId: this._databaseId,
        });

      skills = await Promise.all(qualificationsDto.map(this.serializeSkills));

      skills = skills.sort(
        (a, b) =>
          Number(b.subtitle.replace(/\D/gim, '')) -
          Number(a.subtitle.replace(/\D/gim, '')),
      );

      if (skills) {
        try {
          await this.redisService.set(`skills_${language}`, skills);
        } catch (error) {}
      }
    }

    return skills;
  }

  private serializeSkills = async ({
    properties,
  }: NotionReadProperties<SkillListDto>) => {
    properties = plainToClass(SkillListDto, properties);

    if (properties.section) {
      properties.skillsList = await this.getSkillsList(properties.section);
    }

    return properties;
  };

  private getSkillsList = async (tag: string): Promise<SkillDto[]> => {
    const {
      results: skillsList,
    }: { results: NotionReadProperties<SkillDto>[] } =
      await this.notionService.read<SkillDto>({
        databaseId: this._databaseSkillListId,
        filter: {
          property: 'tag',
          multi_select: {
            contains: tag.toLowerCase(),
          },
        },
      });

    return skillsList
      .map(({ properties }: { properties: SkillDto }) => {
        const { name, percentage } = plainToClass(SkillDto, properties);

        return {
          name,
          percentage,
        };
      })
      .sort((a, b) => b.percentage - a.percentage);
  };
}
