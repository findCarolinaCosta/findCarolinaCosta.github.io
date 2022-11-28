import { IQualificationModel } from "../models/IModel";
import { Qualification as QualificationModel } from "../models/Qualification";
import { Client } from "@notionhq/client";
import { Response, Request } from "express";
import { IQualificationController } from "./IController";
import { success } from "../utils/apiResponse";

export class Qualification implements IQualificationController {
  private _model: IQualificationModel;
  private _notion: Client;
  private _databaseId: string;

  constructor(model: IQualificationModel | null = null) {
    this._notion = new Client({
      auth: process.env.NOTION_QUALIFICATION_KEY,
    });
    this._databaseId = process.env.NOTION_QUALIFICATION_TAB_DATABASE_ID || "";
    this._model =
      model ||
      new QualificationModel(
        this._notion,
        this._databaseId,
        process.env.NOTION_QUALIFICATION_DATA_DATABASE_ID || ""
      );
  }

  public readMany = async (_req: Request, res: Response) => {
    try {
      const qualifications = await this._model.readMany();

      return res.status(200).json(success(qualifications));
    } catch (error) {
      console.error(error);
    }
  };
}
