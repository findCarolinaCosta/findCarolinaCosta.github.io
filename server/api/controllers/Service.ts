import { IServiceModel, Language } from "../models/IModel";
import { Response, Request, NextFunction } from "express";
import { IServiceController } from "./IController";
import { success } from "../utils/apiResponse";
import { ErrorGenerate } from "../middlewares/errorHandler";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { Service as ServiceService } from "../services/Service";
import { IServiceService } from "../services/IService";

export class Service implements IServiceController {
  private _service: IServiceService;

  constructor(service: IServiceModel | null = null) {
    this._service = service || new ServiceService();
  }

  public readMany = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const language = (req.query.language as Language) || Language["en-us"];
      const services = await this._service.readMany(language);

      if (!services)
        throw new ErrorGenerate(StatusCodes.NOT_FOUND, ReasonPhrases.NOT_FOUND);

      return res.status(StatusCodes.OK).json(success(services));
    } catch (error: unknown) {
      next(error);
    }
  };
}
