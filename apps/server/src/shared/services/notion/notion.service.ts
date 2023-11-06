import { Injectable } from '@nestjs/common';
import { Client } from '@notionhq/client';
import { Language } from 'shared/constants/language.enum';
import {
  NotionCreateParams,
  NotionReadParams,
  NotionReadResult,
} from './notion.type';
import { NotionDatabase } from 'shared/constants/notion.database';
import { QueryDatabaseParameters } from '@notionhq/client/build/src/api-endpoints';

@Injectable()
export class NotionService {
  constructor(private readonly _notion: Client) {}

  public async read<T>({
    language,
    databaseId,
    filter,
  }: NotionReadParams): Promise<NotionReadResult<T>> {
    if (!databaseId) throw new Error('Database ID is required');

    const notionFilters: QueryDatabaseParameters['filter'] = {
      and: [],
    };

    if (Language[language]) {
      notionFilters.and.push({
        property: 'language',
        select: {
          equals: language,
        },
      });
    }

    if (filter) notionFilters.and.push(filter);

    return (await this._notion.databases.query({
      database_id: databaseId,
      filter: notionFilters,
    })) as unknown as NotionReadResult<T>;
  }

  public async create({ databaseId, data }: NotionCreateParams): Promise<void> {
    this._notion.pages.create({
      parent: {
        database_id: databaseId,
      },
      properties: data,
    });
  }

  public async healthCheck(): Promise<{
    status: boolean;
    error?: any;
  }> {
    try {
      await this.read({
        language: null,
        databaseId: NotionDatabase.NOTION_MAIN_CONTENT_DATABASE_ID,
      });

      return {
        status: true,
      };
    } catch (error) {
      return {
        status: false,
        error,
      };
    }
  }
}
