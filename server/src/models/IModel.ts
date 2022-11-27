import { QueryDatabaseResponse } from "@notionhq/client/build/src/api-endpoints";

export interface IEmail {
  databaseId: string;
  Name: string;
  Project: string;
  Message: string;
  Email: string;
}

export interface IContactModel {
  create: (data: IEmail) => Promise<void>;
  readOne: (id: string) => Promise<QueryDatabaseResponse | undefined>;
  readMany: () => Promise<QueryDatabaseResponse | undefined>;
  delete: (id: string) => Promise<void>;
  //   update: () => Promise<void>;
}

export interface IProject {
  ID: string;
  databaseId?: string;
  Title: string;
  Description: string;
  Image: string;
  Demo: string;
  Code: string;
}

export interface IPortfolioModel {
  readMany: () => Promise<IProject[] | undefined>;
}

export enum Section {
  "FRONTEND" = "frontend",
  "BACKEND" = "backend",
}

export interface ISkill {
  ID?: string;
  title: string;
  subtitle: string;
  unicons: string;
  section: Section;
  skillsList: { ID?: string; name: string; percentage: number }[];
}

export interface ISkillModel {
  readMany: () => Promise<ISkill[] | undefined | any>;
}

export enum Tab {
  "EDUCATION" = "Education",
  "WORK" = "Work",
}

export interface IQualification {
  title: string;
  subtitle: string;
  startYear: string;
  finalYear: string;
}

export interface IQualifications {
  ID?: string;
  tab: Tab;
  unicon: string;
  data: IQualification[];
}

export interface IQualificationModel {
  readMany: () => Promise<IQualifications[] | undefined>;
}

export interface IService {
  title: string;
  serviceList: string[];
}

export interface IServiceModel {
  readMany: () => Promise<IService[] | undefined>;
}
