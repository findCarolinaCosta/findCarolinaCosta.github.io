import { IQualificationModel } from "./IModel";
import { Client } from "@notionhq/client";
import {
  IQualificationResponse,
  IQualificationData,
  serializeQualification,
} from "../utils/serializeQualification";

const notion = new Client();

export class Qualification<T extends typeof notion>
  implements IQualificationModel
{
  private _model: T;
  private _notionDatabaseTabId: string;
  private _notionDatabaseDataId: string;

  constructor(model: T, databaseId: string, dataDatabaseId = "") {
    this._model = model;
    this._notionDatabaseTabId = databaseId;
    this._notionDatabaseDataId = dataDatabaseId;
  }

  async readMany() {
    if (this._notionDatabaseTabId !== "" && this._notionDatabaseDataId !== "") {
      const { results } = (await this._model.databases.query({
        database_id: this._notionDatabaseTabId,
      })) as unknown as { results: IQualificationResponse[] };

      await Promise.all(
        results.map(async (skill) => {
          if (skill.properties.tab) {
            console.log(skill.properties.tab.title[0].text.content);

            skill.properties.data.relation = [
              (await this._model.databases.query({
                database_id: this._notionDatabaseDataId,
                filter: {
                  property: "tag",
                  multi_select: {
                    contains: skill.properties.tab.title[0].text.content,
                  },
                },
              })) as unknown as IQualificationData,
            ];
          }
        })
      );

      return serializeQualification(results);
    }
  }
}
