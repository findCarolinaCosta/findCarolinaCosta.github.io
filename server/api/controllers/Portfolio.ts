import { IPortfolioModel, Language } from "./../models/IModel";
import { Portfolio as PortfolioModel } from "./../models/Portfolio";
import { Client } from "@notionhq/client";
import { Response, Request, NextFunction } from "express";
import { IPortfolioController } from "./IController";
import { success } from "../utils/apiResponse";
import { ErrorGenerate } from "../middlewares/errorHandler";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

export class Portfolio implements IPortfolioController {
  private _model: IPortfolioModel;
  private _notion: Client;
  private _modelPT: IPortfolioModel;

  constructor(model: IPortfolioModel | null = null) {
    this._notion = new Client({
      auth: process.env.NOTION_PORTFOLIO_KEY,
    });
    this._model =
      model ||
      new PortfolioModel(
        this._notion,
        process.env.NOTION_PORTFOLIO_PROJECTS_DATABASE_ID || ""
      );
    this._modelPT =
      model ||
      new PortfolioModel(
        this._notion,
        process.env.NOTION_PORTFOLIO_PROJECTS_DATABASE_ID_PT_BR || ""
      );
  }

  public readMany = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const language = (req.query.language as Language) || Language["en-us"];
      if (language == Language["pt-br"]) {
        const projects = await this._modelPT.readMany();

        if (!projects)
          throw new ErrorGenerate(
            StatusCodes.NOT_FOUND,
            ReasonPhrases.NOT_FOUND
          );

        return res.status(StatusCodes.OK).json(success(projects));
      }

      const projects = await this._model.readMany();

      if (!projects)
        throw new ErrorGenerate(StatusCodes.NOT_FOUND, ReasonPhrases.NOT_FOUND);

      return res.status(StatusCodes.OK).json(success(projects));
    } catch (error: unknown) {
      next(error);
    }
  };
}
