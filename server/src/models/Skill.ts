import { ISkillModel } from "./IModel";
import { Client } from "@notionhq/client";
import {
  ISkillItem,
  serializeSkill,
  ISkillResponse,
} from "../utils/serializeSkill";

const notion = new Client();

export class Skill<T extends typeof notion> implements ISkillModel {
  private _model: T;
  private _notionDatabaseId: string;
  private _notionDatabaseSkillListId: string;

  constructor(model: T, databaseId: string, skillListDatabaseId = "") {
    this._model = model;
    this._notionDatabaseId = databaseId;
    this._notionDatabaseSkillListId = skillListDatabaseId;
  }

  async readMany() {
    if (
      this._notionDatabaseId !== "" &&
      this._notionDatabaseSkillListId !== ""
    ) {
      const { results } = (await this._model.databases.query({
        database_id: this._notionDatabaseId,
      })) as unknown as { results: ISkillResponse[] };

      await Promise.all(
        results.map(async (skill) => {
          if (skill.properties.section.select.name) {
            skill.properties.skillsList.relation = [
              (await this._model.databases.query({
                database_id: this._notionDatabaseSkillListId,
                filter: {
                  property: "tag",
                  multi_select: {
                    contains:
                      skill.properties.section.select.name.toLowerCase(),
                  },
                },
              })) as unknown as ISkillItem,
            ];
          }
        })
      );

      return serializeSkill(results);
    }
  }
}
