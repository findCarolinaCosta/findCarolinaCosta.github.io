import { Language } from '@/shared/constants/language.enum';
import {
  CreatePageParameters,
  QueryDatabaseParameters,
} from '@notionhq/client/build/src/api-endpoints';

const notionFilters: QueryDatabaseParameters['filter'] = {
  and: [],
};

export type NotionReadParams = {
  language?: Language | null;
  databaseId: string;
  filter?: (typeof notionFilters.and)[0];
};

export type NotionReadProperties<T> = {
  properties: T;
};

export type NotionReadResult<T> = {
  results: Array<NotionReadProperties<T>>;
};

export type NotionPropertyCreateParameters = CreatePageParameters['properties'];

export interface NotionCreateParams {
  databaseId: string;
  data: NotionPropertyCreateParameters;
}
