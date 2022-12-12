import { ISkillModel } from "../models/IModel";
import { Skill as SkillModel } from "../models/Skill";
import { Client } from "@notionhq/client";
import { Response, Request } from "express";
import { ISkillController } from "./IController";
import { success } from "../utils/apiResponse";

export class Skill implements ISkillController {
  private _model: ISkillModel;
  private _notion: Client;
  private _databaseId: string;

  constructor(model: ISkillModel | null = null) {
    this._notion = new Client({
      auth: process.env.NOTION_PORTFOLIO_KEY,
    });
    this._databaseId = process.env.NOTION_SKILL_DATABASE_ID || "";
    this._model =
      model ||
      new SkillModel(
        this._notion,
        this._databaseId,
        process.env.NOTION_SKILLLIST_DATABASE_ID || ""
      );
  }

  public readMany = async (_req: Request, res: Response) => {
    try {
      const skills = await this._model.readMany();

      return res.status(200).json(success(skills));
    } catch (error) {
      console.error(error);
    }
  };
}
