import { Response, Request, NextFunction } from "express";
import { IQualificationController } from "./IController";
import { success } from "../utils/apiResponse";
import { ErrorGenerate } from "../middlewares/errorHandler";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { IQualificationService } from "../services/IService";
import { Qualification as QualificationService } from "../services/Qualification";
import { Language } from "../models/IModel";

export class Qualification implements IQualificationController {
  private _service: IQualificationService;

  constructor(service: IQualificationService | null = null) {
    this._service = service || new QualificationService();
  }

  public readMany = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const language = (req.query.language as Language) || Language["en-us"];
      const qualifications = await this._service.readMany(language);

      if (!qualifications)
        throw new ErrorGenerate(StatusCodes.NOT_FOUND, ReasonPhrases.NOT_FOUND);

      return res.status(StatusCodes.OK).json(success(qualifications));
    } catch (error: unknown) {
      next(error);
    }
  };
}
