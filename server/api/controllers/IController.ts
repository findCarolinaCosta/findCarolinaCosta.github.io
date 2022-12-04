import { Response, Request } from "express";
import {
  IProject,
  IQualifications,
  ISkill,
  IService,
  IMainInfo,
} from "../models/IModel";

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

export interface IQualificationController {
  readMany: (
    req: Request,
    res: Response
  ) => Promise<Response<IQualifications[]> | void>;
}

export interface IServiceController {
  readMany: (
    req: Request,
    res: Response
  ) => Promise<Response<IService[]> | void>;
}

export interface IMainInfoController {
  read: (req: Request, res: Response) => Promise<Response<IMainInfo[]> | void>;
}
