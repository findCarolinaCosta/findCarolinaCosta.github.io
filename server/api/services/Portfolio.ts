import { IPortfolioModel, IProject, Language } from "./../models/IModel";
import { Portfolio as PortfolioModel } from "./../models/Portfolio";
import { Client } from "@notionhq/client";
import { IPortfolioService } from "./IService";
import { redis } from "./redis";

export class Portfolio implements IPortfolioService {
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

  public async readMany(language: Language) {
    let projects = await redis.get(`projects_${language}`);

    if (!projects) {
      if (language == Language["pt-br"])
        projects = await this._modelPT.readMany();
      else projects = await this._model.readMany();

      if (projects) await redis.set(`projects_${language}`, projects);
    }

    return projects;
  }
}
