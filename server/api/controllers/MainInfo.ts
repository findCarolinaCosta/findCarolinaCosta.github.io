import { IMainInfoModel } from "./../models/IModel";
import { MainInfo as MainInfoModel } from "./../models/MainInfo";
import { Client } from "@notionhq/client";
import { Response, Request } from "express";
import { IMainInfoController } from "./IController";
import { success } from "../utils/apiResponse";

export class MainInfo implements IMainInfoController {
  private _model: IMainInfoModel;
  private _notion: Client;
  private _databaseId: string;

  constructor(model: IMainInfoModel | null = null) {
    this._notion = new Client({
      auth: process.env.NOTION_MAIN_CONTENT_KEY,
    });
    this._databaseId = process.env.NOTION_MAIN_CONTENT_DATABASE_ID || "";
    this._model = model || new MainInfoModel(this._notion, this._databaseId);
  }

  public read = async (_req: Request, res: Response) => {
    try {
      const mainInfos = await this._model.read();

      return res.status(200).json(success(mainInfos));
    } catch (error) {
      console.error(error);
    }
  };
}
