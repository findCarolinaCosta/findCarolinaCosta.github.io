import { QueryDatabaseResponse } from "@notionhq/client/build/src/api-endpoints";

export interface IEmail {
  databaseId: string;
  Name: string;
  Project: string;
  Message: string;
  Email: string;
}

export interface IContactModel {
  create: (data: IEmail) => Promise<void>;
  readOne: (id: string) => Promise<QueryDatabaseResponse | undefined>;
  readMany: () => Promise<QueryDatabaseResponse | undefined>;
  delete: (id: string) => Promise<void>;
  //   update: () => Promise<void>;
}
