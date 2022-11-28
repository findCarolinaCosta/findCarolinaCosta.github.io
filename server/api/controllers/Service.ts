import { IServiceModel } from "../models/IModel";
import { Service as ServiceModel } from "../models/Service";
import { Client } from "@notionhq/client";
import { Response, Request } from "express";
import { IServiceController } from "./IController";
import { success } from "../utils/apiResponse";

export class Service implements IServiceController {
  private _model: IServiceModel;
  private _notion: Client;
  private _databaseId: string;

  constructor(model: IServiceModel | null = null) {
    this._notion = new Client({
      auth: process.env.NOTION_SERVICE_KEY,
    });
    this._databaseId = process.env.NOTION_SERVICE_DATABASE_ID || "";
    this._model =
      model ||
      new ServiceModel(
        this._notion,
        this._databaseId,
        process.env.NOTION_SERVICE_LIST_DATABASE_ID || ""
      );
  }

  public readMany = async (_req: Request, res: Response) => {
    try {
      const services = await this._model.readMany();

      return res.status(200).json(success(services));
    } catch (error) {
      console.error(error);
    }
  };
}
