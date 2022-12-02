import { IProject } from "../models/IModel";

export interface IProjectsResponse {
  Demo: {
    url: string;
  };
  ID: {
    rich_text: [
      {
        text: {
          content: string;
        };
      }
    ];
  };
  Code: {
    url: string;
  };
  Description: {
    rich_text: [
      {
        text: {
          content: string;
        };
      }
    ];
  };
  Image: {
    url: string;
  };
  Title: {
    title: [
      {
        text: {
          content: string;
        };
      }
    ];
  };
}

export function serializeProject(data: IProjectsResponse): IProject {
  return {
    ID: data.ID.rich_text[0].text.content,
    Code: data.Code.url,
    Demo: data.Demo.url,
    Title: data.Title.title[0].text.content,
    Image: data.Image.url,
    Description: data.Description.rich_text[0].text.content,
  };
}
