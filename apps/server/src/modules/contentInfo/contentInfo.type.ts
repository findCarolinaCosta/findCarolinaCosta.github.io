export interface IContentInfoNotionResponse {
  projects: {
    number: number;
  };
  aboutDescription: {
    rich_text: Array<{
      text: {
        content: string;
      };
    }>;
  };
  homeDescription: {
    rich_text: Array<{
      text: {
        content: string;
      };
    }>;
  };
  role: {
    title: Array<{
      text: {
        content: string;
      };
    }>;
  };
  homeImg: {
    url: string;
  };
}

export interface IContentInfo {
  role: string;
  homeDescription: string;
  aboutDescription: string;
  projects: number;
  homeImg: string;
}
