import { Client } from "@notionhq/client";
import { IMainInfoModel, Language } from "../models/IModel";
import { MainInfo as MainInfoModel } from "./../models/MainInfo";
import { redis } from "./redis";
import { IMainInfoService } from "./IService";

export class MainInfo implements IMainInfoService {
  private _model: IMainInfoModel;
  private _notion: Client;
  private _databaseId: string;

  constructor(model: IMainInfoModel | null = null) {
    this._notion = new Client({
      auth: process.env.NOTION_PORTFOLIO_KEY,
    });
    this._databaseId = process.env.NOTION_MAIN_CONTENT_DATABASE_ID || "";
    this._model = model || new MainInfoModel(this._notion, this._databaseId);
  }

  public async read(language: Language) {
    let mainInfos: any = (await redis.get(`content_${language}`)) || null;

    if (!mainInfos) {
      mainInfos = await this._model.read(language);

      redis.set(`content_${language}`, mainInfos);
    }

    return mainInfos;
  }
}
