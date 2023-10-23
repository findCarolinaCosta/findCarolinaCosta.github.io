import {
  IMainInfo,
  IProject,
  IQualification,
  IService,
  ISkill,
  Language,
} from "../models/IModel";

export interface IMainInfoService {
  read: (language: Language) => Promise<IMainInfo[] | undefined>;
}

export interface IPortfolioService {
  readMany: (language: Language) => Promise<IProject[] | undefined>;
}

export interface IServiceService {
  readMany: (language: Language) => Promise<IService[] | undefined>;
}

export interface IQualificationService {
  readMany: (language: Language) => Promise<IQualification[] | undefined>;
}

export interface ISkillService {
  readMany: (language: Language) => Promise<ISkill[] | undefined>;
}
