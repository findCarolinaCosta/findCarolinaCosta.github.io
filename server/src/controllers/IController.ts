import { Response, Request } from "express";
import { IProject } from "../models/IModel";

export interface IContactController {
  create: (req: Request, res: Response) => Promise<Response<void> | void>;
}

export interface IPortfolioController {
  readMany: (
    req: Request,
    res: Response
  ) => Promise<Response<IProject[]> | void>;
}
