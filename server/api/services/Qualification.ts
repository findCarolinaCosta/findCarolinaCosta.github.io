import { Language } from "../models/IModel";
import { IQualificationModel } from "../models/IModel";
import { Qualification as QualificationModel } from "../models/Qualification";
import { Client } from "@notionhq/client";
import { IQualificationService } from "./IService";
import { redis } from "./redis";

export class Qualification implements IQualificationService {
  private _model: IQualificationModel;
  private _notion: Client;
  private _modelPT: IQualificationModel;

  constructor(model: IQualificationModel | null = null) {
    this._notion = new Client({
      auth: process.env.NOTION_PORTFOLIO_KEY,
    });
    this._model =
      model ||
      new QualificationModel(
        this._notion,
        process.env.NOTION_QUALIFICATION_TAB_DATABASE_ID || "",
        process.env.NOTION_QUALIFICATION_DATA_DATABASE_ID || ""
      );
    this._modelPT =
      model ||
      new QualificationModel(
        this._notion,
        process.env.NOTION_QUALIFICATION_TAB_DATABASE_ID_PT_BR || "",
        process.env.NOTION_QUALIFICATION_DATA_DATABASE_ID_PT_BR || ""
      );
  }

  public async readMany(language: Language) {
    let qualifications = await redis.get(`qualifications_${language}`);

    if (!qualifications) {
      if (language == Language["pt-br"]) await this._modelPT.readMany();
      else qualifications = await this._model.readMany();

      if (qualifications)
        await redis.set(`qualifications_${language}`, qualifications);
    }

    return qualifications;
  }
}
