import { IServiceModel, Language } from "../models/IModel";
import { Service as ServiceModel } from "../models/Service";
import { Client } from "@notionhq/client";
import { Response, Request } from "express";
import { IServiceController } from "./IController";
import { success } from "../utils/apiResponse";

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

  public readMany = async (req: Request, res: Response) => {
    try {
      const language = (req.query.language as Language) || Language["en-us"];
      if (language == Language["pt-br"]) {
        const skills = await this._modelPT.readMany();

        return res.status(200).json(success(skills));
      }
      const services = await this._model.readMany();

      return res.status(200).json(success(services));
    } catch (error) {
      console.error(error);
    }
  };
}
