import { Language } from 'src/shared/constants/language.enum';

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
