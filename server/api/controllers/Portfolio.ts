import { IPortfolioModel, Language } from "./../models/IModel";
import { Portfolio as PortfolioModel } from "./../models/Portfolio";
import { Client } from "@notionhq/client";
import { Response, Request } from "express";
import { IPortfolioController } from "./IController";
import { success } from "../utils/apiResponse";

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

  public readMany = async (req: Request, res: Response) => {
    try {
      const language = (req.query.language as Language) || Language["en-us"];
      if (language == Language["pt-br"]) {
        const projects = await this._modelPT.readMany();

        return res.status(200).json(success(projects));
      }

      const projects = await this._model.readMany();

      return res.status(200).json(success(projects));
    } catch (error) {
      console.error(error);
    }
  };
}
