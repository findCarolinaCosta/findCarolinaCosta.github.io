import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import {
  QualificationDataNotionResponseDto,
  QualificationDto,
  QualificationsNotionResponseDto,
} from 'src/dto/qualification.dto';
import { Language } from 'src/shared/constants/language.enum';
import { NotionDatabase } from 'src/shared/constants/notion.database';
import { NotionService } from 'src/shared/services/notion/notion.service';
import { NotionReadProperties } from 'src/shared/services/notion/notion.type';
import { RedisService } from 'src/shared/services/redis/redis.service';

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
    let qualifications: QualificationDto[] = await this.redisService.get(
      `qualifications_${language}`,
    );

    if (!qualifications) {
      if (language === Language.PORTUGUESE) {
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

      this.redisService.set(`qualifications_${language}`, qualifications);
    }

    return qualifications;
  }

  private serializeQualifications = async ({
    properties,
  }: NotionReadProperties<QualificationDto>) => {
    properties = plainToClass(QualificationsNotionResponseDto, properties);

    if (properties.tab) {
      properties.data = await this.getSerializedQualificationsData(
        properties.tab,
      );
    }

    return properties;
  };

  private async getSerializedQualificationsData(tab: string) {
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
      ({
        properties,
      }: {
        properties: QualificationDataNotionResponseDto & {
          tag: object;
          tab: object;
        };
      }) => {
        delete properties.tag;
        delete properties.tab;

        return plainToClass(QualificationDataNotionResponseDto, properties);
      },
    );
  }
}
