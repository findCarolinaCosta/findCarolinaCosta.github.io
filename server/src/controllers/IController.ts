import { Response, Request } from "express";
import { IProject, ISkill } from "../models/IModel";

export interface IContactController {
  create: (req: Request, res: Response) => Promise<Response<void> | void>;
}

export interface IPortfolioController {
  readMany: (
    req: Request,
    res: Response
  ) => Promise<Response<IProject[]> | void>;
}

export interface ISkillController {
  readMany: (req: Request, res: Response) => Promise<Response<ISkill[]> | void>;
}
