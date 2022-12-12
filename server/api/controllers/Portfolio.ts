import { IPortfolioModel } from "./../models/IModel";
import { Portfolio as PortfolioModel } from "./../models/Portfolio";
import { Client } from "@notionhq/client";
import { Response, Request } from "express";
import { IPortfolioController } from "./IController";
import { success } from "../utils/apiResponse";

export class Portfolio implements IPortfolioController {
  private _model: IPortfolioModel;
  private _notion: Client;
  private _databaseId: string;

  constructor(model: IPortfolioModel | null = null) {
    this._notion = new Client({
      auth: process.env.NOTION_PORTFOLIO_KEY,
    });
    this._databaseId = process.env.NOTION_PORTFOLIO_PROJECTS_DATABASE_ID || "";
    this._model = model || new PortfolioModel(this._notion, this._databaseId);
  }

  public readMany = async (_req: Request, res: Response) => {
    try {
      const projects = await this._model.readMany();

      return res.status(200).json(success(projects));
    } catch (error) {
      console.error(error);
    }
  };
}
