import { IPortfolioModel, Language } from "./../models/IModel";
import { Portfolio as PortfolioModel } from "./../models/Portfolio";
import { Client } from "@notionhq/client";
import { Response, Request, NextFunction } from "express";
import { IPortfolioController } from "./IController";
import { success } from "../utils/apiResponse";
import { ErrorGenerate } from "../middlewares/errorHandler";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { IPortfolioService } from "../services/IService";
import { Portfolio as PortfolioService } from "../services/Portfolio";

export class Portfolio implements IPortfolioController {
  private _service: IPortfolioService;

  constructor(service: IPortfolioService | null = null) {
    this._service = service || new PortfolioService();
  }

  public readMany = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const language = (req.query.language as Language) || Language["en-us"];
      const projects = await this._service.readMany(language);

      if (!projects)
        throw new ErrorGenerate(StatusCodes.NOT_FOUND, ReasonPhrases.NOT_FOUND);

      return res.status(StatusCodes.OK).json(success(projects));
    } catch (error: unknown) {
      next(error);
    }
  };
}
