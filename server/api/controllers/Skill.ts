import { ISkillModel, Language } from "../models/IModel";
import { Skill as SkillModel } from "../models/Skill";
import { Client } from "@notionhq/client";
import { Response, Request, NextFunction } from "express";
import { ISkillController } from "./IController";
import { success } from "../utils/apiResponse";
import { ErrorGenerate } from "../middlewares/errorHandler";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

export class Skill implements ISkillController {
  private _model: ISkillModel;
  private _notion: Client;
  private _modelPT: ISkillModel;

  constructor(model: ISkillModel | null = null) {
    this._notion = new Client({
      auth: process.env.NOTION_PORTFOLIO_KEY,
    });
    this._model =
      model ||
      new SkillModel(
        this._notion,
        process.env.NOTION_SKILL_DATABASE_ID || "",
        process.env.NOTION_SKILLLIST_DATABASE_ID || ""
      );
    this._modelPT =
      model ||
      new SkillModel(
        this._notion,
        process.env.NOTION_SKILL_DATABASE_ID_PT_BR || "",
        process.env.NOTION_SKILLLIST_DATABASE_ID || ""
      );
  }

  public readMany = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const language = (req.query.language as Language) || Language["en-us"];

      if (language == Language["pt-br"]) {
        const skills = await this._modelPT.readMany();

        if (!skills)
          throw new ErrorGenerate(
            StatusCodes.NOT_FOUND,
            ReasonPhrases.NOT_FOUND
          );

        return res.status(StatusCodes.OK).json(success(skills));
      }

      const skills = await this._model.readMany();

      if (!skills)
        throw new ErrorGenerate(StatusCodes.NOT_FOUND, ReasonPhrases.NOT_FOUND);

      return res.status(StatusCodes.OK).json(success(skills));
    } catch (error: unknown) {
      next(error);
    }
  };
}
