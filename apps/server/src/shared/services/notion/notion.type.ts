import { Language } from 'src/shared/constants/language.enum';
import { CreatePageParameters } from '@notionhq/client/build/src/api-endpoints';

export type NotionReadParams = {
  language: Language | null;
  databaseId: string;
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
