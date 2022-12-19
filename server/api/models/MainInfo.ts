import {
  IMainInfoResponse,
  serializeMainInfo,
} from "./../utils/serializeMainInfo";
import { IMainInfoModel, Language } from "./IModel";
import { Client } from "@notionhq/client";

const notion = new Client();

export class MainInfo<T extends typeof notion> implements IMainInfoModel {
  private _model: T;
  private _notionDatabaseId: string;

  constructor(model: T, databaseId: string) {
    this._model = model;
    this._notionDatabaseId = databaseId;
  }

  async read(language: Language) {
    if (this._notionDatabaseId !== "") {
      const { results } = (await this._model.databases.query({
        database_id: this._notionDatabaseId,
        filter: {
          property: "language",
          select: {
            equals: language,
          },
        },
      })) as unknown as { results: { properties: IMainInfoResponse }[] };

      const response = results.map(
        ({ properties }: { properties: IMainInfoResponse }) =>
          serializeMainInfo(properties)
      );

      return response;
    }
  }
}
