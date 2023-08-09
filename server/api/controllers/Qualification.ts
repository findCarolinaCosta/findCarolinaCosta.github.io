import { IQualificationModel, Language } from "../models/IModel";
import { Qualification as QualificationModel } from "../models/Qualification";
import { Client } from "@notionhq/client";
import { Response, Request, NextFunction } from "express";
import { IQualificationController } from "./IController";
import { success } from "../utils/apiResponse";
import { ErrorGenerate } from "../middlewares/errorHandler";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

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

  public readMany = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const language = (req.query.language as Language) || Language["en-us"];
      if (language == Language["pt-br"]) {
        const qualifications = await this._modelPT.readMany();

        if (!qualifications)
          throw new ErrorGenerate(
            StatusCodes.NOT_FOUND,
            ReasonPhrases.NOT_FOUND
          );

        return res.status(StatusCodes.OK).json(success(qualifications));
      }
      const qualifications = await this._model.readMany();

      if (!qualifications)
        throw new ErrorGenerate(StatusCodes.NOT_FOUND, ReasonPhrases.NOT_FOUND);

      return res.status(StatusCodes.OK).json(success(qualifications));
    } catch (error: unknown) {
      next(error);
    }
  };
}
