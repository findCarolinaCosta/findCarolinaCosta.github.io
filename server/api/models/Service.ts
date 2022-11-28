import { IServiceModel } from "./IModel";
import { Client } from "@notionhq/client";
import { serializeService } from "../utils/serializeService";

const notion = new Client();

export interface IServiceItem {
  results: {
    properties: {
      service: {
        title: {
          text: {
            content: string;
          };
        }[];
      };
    };
  }[];
}

export interface IServiceResponse {
  properties: {
    List: {
      relation: IServiceItem[];
    };
    tag: {
      select: {
        name: string;
      };
    };
    title: {
      title: {
        text: {
          content: string;
        };
      }[];
    };
  };
}

export class Service<T extends typeof notion> implements IServiceModel {
  private _model: T;
  private _notionDatabaseId: string;
  private _notionDatabaseListId: string;

  constructor(model: T, databaseId: string, listDatabaseId = "") {
    this._model = model;
    this._notionDatabaseId = databaseId;
    this._notionDatabaseListId = listDatabaseId;
  }

  async readMany() {
    if (this._notionDatabaseId !== "" && this._notionDatabaseListId !== "") {
      const { results } = (await this._model.databases.query({
        database_id: this._notionDatabaseId,
      })) as unknown as { results: IServiceResponse[] };

      await Promise.all(
        results.map(async (service) => {
          if (service.properties.List) {
            service.properties.List.relation = [
              (await this._model.databases.query({
                database_id: this._notionDatabaseListId,
                filter: {
                  property: "tag",
                  multi_select: {
                    contains: service.properties.tag.select.name,
                  },
                },
              })) as unknown as IServiceItem,
            ];
          }
        })
      );

      return serializeService(results);
    }
  }
}
