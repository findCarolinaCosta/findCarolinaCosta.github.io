import { Language } from "./../models/IModel";
import { ISkillModel } from "../models/IModel";
import { Skill as SkillModel } from "../models/Skill";
import { Client } from "@notionhq/client";
import { ISkillService } from "./IService";
import { redis } from "./redis";

export class Skill implements ISkillService {
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

  public async readMany(language: Language) {
    let skills = await redis.get(`skills_${language}`);

    if (!skills) {
      if (language == Language["pt-br"])
        skills = await this._modelPT.readMany();
      else skills = await this._model.readMany();

      if (skills) await redis.set(`skills_${language}`, skills);
    }

    return skills;
  }
}
