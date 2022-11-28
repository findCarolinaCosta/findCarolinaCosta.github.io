import { IProjectsResponse } from "./../utils/serializeProject";
import { IPortfolioModel } from "./IModel";
import { Client } from "@notionhq/client";
import { serializeProject } from "../utils/serializeProject";

const notion = new Client();

export class Portfolio<T extends typeof notion> implements IPortfolioModel {
  private _model: T;
  private _notionDatabaseId: string;

  constructor(model: T, databaseId: string) {
    this._model = model;
    this._notionDatabaseId = databaseId;
  }

  async readMany() {
    if (this._notionDatabaseId !== "") {
      const { results } = (await this._model.databases.query({
        database_id: this._notionDatabaseId,
      })) as unknown as { results: [{ properties: IProjectsResponse }] };

      const response = results.map(
        ({ properties }: { properties: IProjectsResponse }) =>
          serializeProject(properties)
      );

      return response;
    }
  }
}
