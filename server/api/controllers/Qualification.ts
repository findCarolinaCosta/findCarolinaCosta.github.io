import { IQualificationModel, Language } from "../models/IModel";
import { Qualification as QualificationModel } from "../models/Qualification";
import { Client } from "@notionhq/client";
import { Response, Request } from "express";
import { IQualificationController } from "./IController";
import { success } from "../utils/apiResponse";

export class Qualification implements IQualificationController {
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

  public readMany = async (req: Request, res: Response) => {
    try {
      const language = (req.query.language as Language) || Language["en-us"];
      if (language == Language["pt-br"]) {
        const skills = await this._modelPT.readMany();

        return res.status(200).json(success(skills));
      }
      const qualifications = await this._model.readMany();

      return res.status(200).json(success(qualifications));
    } catch (error) {
      console.error(error);
    }
  };
}
