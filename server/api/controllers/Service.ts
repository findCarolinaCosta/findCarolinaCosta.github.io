import { IServiceModel, Language } from "../models/IModel";
import { Service as ServiceModel } from "../models/Service";
import { Client } from "@notionhq/client";
import { Response, Request, NextFunction } from "express";
import { IServiceController } from "./IController";
import { success } from "../utils/apiResponse";
import { ErrorGenerate } from "../middlewares/errorHandler";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

export class Service implements IServiceController {
  private _model: IServiceModel;
  private _notion: Client;
  private _modelPT: IServiceModel;

  constructor(model: IServiceModel | null = null) {
    this._notion = new Client({
      auth: process.env.NOTION_PORTFOLIO_KEY,
    });
    this._model =
      model ||
      new ServiceModel(
        this._notion,
        process.env.NOTION_SERVICE_DATABASE_ID || "",
        process.env.NOTION_SERVICE_LIST_DATABASE_ID || ""
      );
    this._modelPT =
      model ||
      new ServiceModel(
        this._notion,
        process.env.NOTION_SERVICE_DATABASE_ID_PT_BR || "",
        process.env.NOTION_SERVICE_LIST_DATABASE_ID_PT_BR || ""
      );
  }

  public readMany = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const language = (req.query.language as Language) || Language["en-us"];
      if (language == Language["pt-br"]) {
        const services = await this._modelPT.readMany();

        if (!services)
          throw new ErrorGenerate(
            StatusCodes.NOT_FOUND,
            ReasonPhrases.NOT_FOUND
          );

        return res.status(StatusCodes.OK).json(success(services));
      }
      const services = await this._model.readMany();

      if (!services)
        throw new ErrorGenerate(StatusCodes.NOT_FOUND, ReasonPhrases.NOT_FOUND);

      return res.status(StatusCodes.OK).json(success(services));
    } catch (error: unknown) {
      next(error);
    }
  };
}
