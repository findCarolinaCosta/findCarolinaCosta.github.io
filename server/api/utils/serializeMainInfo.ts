import { IMainInfo } from "../models/IModel";

export interface IMainInfoResponse {
  projects: {
    number: number;
  };
  aboutDescription: {
    rich_text: {
      text: {
        content: string;
      };
    }[];
  };
  homeDescription: {
    rich_text: {
      text: {
        content: string;
      };
    }[];
  };
  role: {
    title: {
      text: {
        content: string;
      };
    }[];
  };
  homeImg: {
    url: string;
  };
}

export function serializeMainInfo(data: IMainInfoResponse): IMainInfo {
  return {
    role: data.role.title[0].text.content,
    homeDescription: data.homeDescription.rich_text[0].text.content,
    aboutDescription: data.aboutDescription.rich_text[0].text.content,
    projects: data.projects.number,
    homeImg: data.homeImg.url,
  };
}
