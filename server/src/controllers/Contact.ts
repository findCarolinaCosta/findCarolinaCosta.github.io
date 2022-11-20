import { IContactModel, IEmail } from "./../models/IModel";
import { Contact as ContactModel } from "./../models/Contact";
import { Client } from "@notionhq/client";
import { Response, Request } from "express";
import { IContactController } from "./IController";

export class Contact implements IContactController {
  private _model: IContactModel;
  private _notion: Client;
  private _databaseId: string;

  constructor(model: IContactModel | null = null) {
    this._notion = new Client({ auth: process.env.NOTION_API_KEY });
    this._databaseId = process.env.NOTION_DATABASE_ID || "";
    this._model = model || new ContactModel(this._notion, this._databaseId);
  }

  public create = async (req: Request, res: Response) => {
    try {
      const body = req.body as unknown as IEmail;

      await this._model.create(body);

      return res.status(201).send();
    } catch (error) {
      console.error(error);
    }
  };
}
