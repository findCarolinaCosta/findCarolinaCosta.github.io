import { IServiceModel, Language } from "../models/IModel";
import { Service as ServiceModel } from "../models/Service";
import { Client } from "@notionhq/client";
import { Response, Request, NextFunction } from "express";
import { success } from "../utils/apiResponse";
import { ErrorGenerate } from "../middlewares/errorHandler";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { IServiceService } from "./IService";
import { redis } from "./redis";

export class Service implements IServiceService {
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

  public async readMany(language: Language) {
    let services = await redis.get(`services_${language}`);

    if (!services) {
      if (language == Language["pt-br"])
        services = await this._modelPT.readMany();
      else services = await this._model.readMany();

      if (services) await redis.set(`services_${language}`, services);
    }

    return services;
  }
}
