import { Injectable } from '@nestjs/common';
import { Language } from '@/shared/constants/language.enum';
import { NotionDatabase } from '@/shared/constants/notion.database';
import { NotionService } from '@/shared/services/notion/notion.service';
import { RedisService } from '@/shared/services/redis/redis.service';
import { IContentInfo, IContentInfoNotionResponse } from './contentInfo.type';
import { NotionReadProperties } from '@/shared/services/notion/notion.type';

@Injectable()
export class ContentInfoService {
  private readonly _databaseId: string =
    NotionDatabase.NOTION_MAIN_CONTENT_DATABASE_ID;

  constructor(
    private readonly redisService: RedisService,
    private readonly notionService: NotionService,
  ) {}

  async getContentInfo(language: Language): Promise<IContentInfo[]> {
    let contentInfo: IContentInfo[] | null = await this.redisService.get<
      IContentInfo[]
    >(`content_${language}`);

    if (!contentInfo) {
      contentInfo = (
        await this.notionService.read<IContentInfoNotionResponse>({
          language,
          databaseId: this._databaseId,
        })
      ).results.map(this.serializeContentInfo);

      this.redisService.set<IContentInfo[]>(`content_${language}`, contentInfo);
    }

    return contentInfo;
  }

  private serializeContentInfo({
    properties,
  }: NotionReadProperties<IContentInfoNotionResponse>): IContentInfo {
    return {
      role: properties.role.title[0].text.content,
      homeDescription: properties.homeDescription.rich_text[0].text.content,
      aboutDescription: properties.aboutDescription.rich_text[0].text.content,
      projects: properties.projects.number,
      homeImg: properties.homeImg.url,
    };
  }
}
