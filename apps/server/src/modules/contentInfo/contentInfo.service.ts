import { Injectable } from '@nestjs/common';
import { Language } from '../../shared/constants/language.enum';
import { NotionDatabase } from '../../shared/constants/notion.database';
import { NotionService } from '../../shared/services/notion/notion.service';
import { RedisService } from '../../shared/services/redis/redis.service';
import { IContentInfoNotionResponse } from './contentInfo.type';
import { NotionReadProperties } from '../../shared/services/notion/notion.type';
import { ContentInfoDto } from '../../dto/contentInfo.dto';

@Injectable()
export class ContentInfoService {
  private readonly _databaseId: string =
    NotionDatabase.NOTION_MAIN_CONTENT_DATABASE_ID;

  constructor(
    private readonly redisService: RedisService,
    private readonly notionService: NotionService,
  ) {}

  async getContentInfo(language: Language): Promise<ContentInfoDto[]> {
    let contentInfo: ContentInfoDto[] | null = await this.redisService.get<
      ContentInfoDto[]
    >(`content_${language}`);

    if (!contentInfo) {
      contentInfo = (
        await this.notionService.read<IContentInfoNotionResponse>({
          language,
          databaseId: this._databaseId,
        })
      ).results.map(this.serializeContentInfo);

      if (contentInfo)
        this.redisService.set<ContentInfoDto[]>(
          `content_${language}`,
          contentInfo,
        );
    }

    return contentInfo;
  }

  private serializeContentInfo({
    properties,
  }: NotionReadProperties<IContentInfoNotionResponse>): ContentInfoDto {
    return {
      role: properties.role.title[0].text.content,
      homeDescription: properties.homeDescription.rich_text[0].text.content,
      aboutDescription: properties.aboutDescription.rich_text[0].text.content,
      projects: properties.projects.number,
      homeImg: properties.homeImg.url,
    };
  }
}
