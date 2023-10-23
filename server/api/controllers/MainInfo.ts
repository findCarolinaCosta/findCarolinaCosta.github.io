import { Language } from "./../models/IModel";
import { Response, Request, NextFunction } from "express";
import { IMainInfoController } from "./IController";
import { success } from "../utils/apiResponse";
import { ErrorGenerate } from "../middlewares/errorHandler";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { MainInfo as MainInfoService } from "../services/MainInfo";
import { IMainInfoService } from "../services/IService";

export class MainInfo implements IMainInfoController {
  private _service: IMainInfoService;

  constructor(service: IMainInfoService | null = null) {
    this._service = service || new MainInfoService();
  }

  public read = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const language = (req.query.language as Language) || Language["en-us"];
      const mainInfos = await this._service.read(language);

      if (!mainInfos)
        throw new ErrorGenerate(StatusCodes.NOT_FOUND, ReasonPhrases.NOT_FOUND);

      return res.status(StatusCodes.OK).json(success(mainInfos));
    } catch (error: unknown) {
      console.log(error);
      next(error);
    }
  };
}
