import { IContactModel, IEmail } from "./IModel";
import { Client } from "@notionhq/client";
import { v4 as uuidv4 } from "uuid";

const notion = new Client();

export class Contact<T extends typeof notion> implements IContactModel {
  private _model: T;
  private _notionDatabaseId: string;
  private _id: string;

  constructor(model: T, databaseId: string) {
    this._model = model;
    this._notionDatabaseId = databaseId;
    this._id = uuidv4();
  }

  async create(data: IEmail) {
    if (this._notionDatabaseId !== "") {
      await this._model.pages.create({
        parent: {
          database_id: this._notionDatabaseId,
        },
        properties: {
          ID: {
            title: [
              {
                text: {
                  content: this._id,
                },
              },
            ],
          },
          Name: {
            rich_text: [
              {
                text: {
                  content: data.Name,
                },
              },
            ],
          },
          Project: {
            rich_text: [
              {
                text: {
                  content: data.Project,
                },
              },
            ],
          },
          Message: {
            rich_text: [
              {
                text: {
                  content: data.Message,
                },
              },
            ],
          },
          Email: {
            email: data.Email,
          },
        },
      });
    }
  }

  async readOne(id: typeof this._id) {
    if (this._notionDatabaseId !== "") {
      const response = await this._model.databases.query({
        database_id: this._notionDatabaseId,
        filter: {
          property: "ID",
          rich_text: {
            contains: id,
          },
        },
      });
      return response;
    }
  }

  async readMany() {
    if (this._notionDatabaseId !== "") {
      const response = await this._model.databases.query({
        database_id: this._notionDatabaseId,
        // filter: {
        //   property: "ID",
        //   rich_text: {
        //     contains: username,
        //   },
        // },
      });
      return response;
    }
  }

  async delete(id: typeof this._id) {
    if (this._notionDatabaseId !== "") {
      const response = (await this.readOne(id)) || { results: [] };

      await this._model.blocks.delete({
        block_id: response.results[0].id,
      });
    }
  }

  // update() {}
}
