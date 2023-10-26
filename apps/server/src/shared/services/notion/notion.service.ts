import { Injectable } from '@nestjs/common';
import { Client } from '@notionhq/client';
import { Language } from 'src/shared/constants/language.enum';
import { NotionReadParams, NotionReadResult } from './notion.type';

@Injectable()
export class NotionService {
  constructor(private readonly _notion: Client) {}

  public async read<T>({
    language,
    databaseId,
  }: NotionReadParams): Promise<NotionReadResult<T>> {
    if (!databaseId) throw new Error('Database ID is required');

    if (Language[language]) {
      return (await this._notion.databases.query({
        database_id: databaseId,
        filter: {
          property: 'language',
          select: {
            equals: language,
          },
        },
      })) as unknown as NotionReadResult<T>;
    }

    return (await this._notion.databases.query({
      database_id: databaseId,
    })) as unknown as NotionReadResult<T>;
  }
}
