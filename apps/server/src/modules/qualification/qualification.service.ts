import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import {
  QualificationDto,
  QualificationDataNotionResponseDto,
  QualificationsDto,
  QualificationsNotionResponseDto,
} from '../../dto/qualification.dto';
import { Language } from '../../shared/constants/language.enum';
import { NotionDatabase } from '../../shared/constants/notion.database';
import { NotionService } from '../../shared/services/notion/notion.service';
import { NotionReadProperties } from '../../shared/services/notion/notion.type';
import { RedisService } from '../../shared/services/redis/redis.service';

@Injectable()
export class QualificationService {
  private _databaseId: string =
    NotionDatabase.NOTION_QUALIFICATION_TAB_DATABASE_ID;
  private _databaseDataId: string =
    NotionDatabase.NOTION_QUALIFICATION_DATA_DATABASE_ID;

  constructor(
    private readonly redisService: RedisService,
    private readonly notionService: NotionService,
  ) {}

  public async getQualifications(language: Language) {
    let qualifications: QualificationsDto[] = await this.redisService.get(
      `qualifications_${language}`,
    );

    if (!qualifications) {
      if (language === Language['pt-br']) {
        this._databaseId =
          NotionDatabase.NOTION_QUALIFICATION_TAB_DATABASE_ID_PT_BR;

        this._databaseDataId =
          NotionDatabase.NOTION_QUALIFICATION_DATA_DATABASE_ID_PT_BR;
      }

      const { results: qualificationsDto } =
        await this.notionService.read<QualificationsNotionResponseDto>({
          databaseId: this._databaseId,
        });

      qualifications = await Promise.all(
        qualificationsDto.map(this.serializeQualifications),
      );

      if (qualifications)
        this.redisService.set(`qualifications_${language}`, qualifications);
    }

    return qualifications;
  }

  private serializeQualifications = async ({
    properties,
  }: NotionReadProperties<QualificationsDto>) => {
    properties = plainToClass(QualificationsNotionResponseDto, properties);

    if (properties.tab) {
      properties.data = await this.getSerializedQualificationsData(
        properties.tab,
      );
    }

    return properties;
  };

  private async getSerializedQualificationsData(
    tab: string,
  ): Promise<QualificationDto[]> {
    const {
      results: qualifications,
    }: { results: NotionReadProperties<QualificationDataNotionResponseDto>[] } =
      await this.notionService.read<QualificationDataNotionResponseDto>({
        databaseId: this._databaseDataId,
        filter: {
          property: 'tag',
          multi_select: {
            contains: tab,
          },
        },
      });

    return qualifications.map(
      ({ properties }: { properties: QualificationDataNotionResponseDto }) => {
        const { finalYear, startYear, subtitle, title } = plainToClass(
          QualificationDataNotionResponseDto,
          properties,
        );

        return {
          finalYear,
          startYear,
          subtitle,
          title,
        };
      },
    );
  }
}
