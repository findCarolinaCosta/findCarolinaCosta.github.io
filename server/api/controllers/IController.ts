import { Response, Request, NextFunction } from "express";
import {
  IProject,
  IQualifications,
  ISkill,
  IService,
  IMainInfo,
} from "../models/IModel";

export interface IContactController {
  create: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<Response<void> | void>;
}

export interface IPortfolioController {
  readMany: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<Response<IProject[]> | void>;
}

export interface ISkillController {
  readMany: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<Response<ISkill[]> | void>;
}

export interface IQualificationController {
  readMany: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<Response<IQualifications[]> | void>;
}

export interface IServiceController {
  readMany: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<Response<IService[]> | void>;
}

export interface IMainInfoController {
  read: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<Response<IMainInfo[]> | void>;
}
