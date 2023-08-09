import { IMainInfoModel, Language } from "./../models/IModel";
import { MainInfo as MainInfoModel } from "./../models/MainInfo";
import { Client } from "@notionhq/client";
import { Response, Request, NextFunction } from "express";
import { IMainInfoController } from "./IController";
import { success } from "../utils/apiResponse";
import { ErrorGenerate } from "../middlewares/errorHandler";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

export class MainInfo implements IMainInfoController {
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

  public read = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const language = (req.query.language as Language) || Language["en-us"];
      const mainInfos = await this._model.read(language);

      if (!mainInfos)
        throw new ErrorGenerate(StatusCodes.NOT_FOUND, ReasonPhrases.NOT_FOUND);

      return res.status(StatusCodes.OK).json(success(mainInfos));
    } catch (error: unknown) {
      next(error);
    }
  };
}
