import { Language } from "../models/IModel";
import { Response, Request, NextFunction } from "express";
import { ISkillController } from "./IController";
import { success } from "../utils/apiResponse";
import { ErrorGenerate } from "../middlewares/errorHandler";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { Skill as SkillService } from "../services/Skill";
import { ISkillService } from "../services/IService";

export class Skill implements ISkillController {
  private _service: ISkillService;

  constructor(service: ISkillService | null = null) {
    this._service = service || new SkillService();
  }

  public readMany = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const language = (req.query.language as Language) || Language["en-us"];
      const skills = await this._service.readMany(language);

      if (!skills)
        throw new ErrorGenerate(StatusCodes.NOT_FOUND, ReasonPhrases.NOT_FOUND);

      return res.status(StatusCodes.OK).json(success(skills));
    } catch (error: unknown) {
      next(error);
    }
  };
}
