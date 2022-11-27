import { IQualification, IQualifications, Tab } from "../models/IModel";

export interface IQualificationData {
  results: {
    properties: {
      startYear: {
        rich_text: [
          {
            text: {
              content: "2022";
            };
          }
        ];
      };
      tag: {
        multi_select: [
          {
            name: "Work";
          }
        ];
      };
      subtitle: {
        rich_text: [
          {
            text: {
              content: "Cashforce";
            };
          }
        ];
      };
      finalYear: {
        rich_text: [
          {
            text: {
              content: "current";
            };
          }
        ];
      };
      title: {
        title: [
          {
            text: {
              content: "Product Development Engineer - Junior";
            };
          }
        ];
      };
    };
  }[];
}

export interface IQualificationResponse {
  properties: {
    data: {
      relation: IQualificationData[];
    };
    unicon: {
      rich_text: {
        text: {
          content: string;
        };
      }[];
    };
    ID: {
      rich_text: {
        text: {
          content: string;
        };
      }[];
    };
    tab: {
      title: {
        text: {
          content: string;
        };
      }[];
    };
  };
}

function serializeQualificationData(
  data: IQualificationData
): IQualification[] {
  return data.results.map((item) => ({
    title: item.properties.title.title[0].text.content,
    subtitle: item.properties.subtitle.rich_text[0].text.content,
    startYear: item.properties.startYear.rich_text[0].text.content,
    finalYear: item.properties.finalYear.rich_text[0].text.content,
  }));
}

export function serializeQualification(
  data: IQualificationResponse[]
): IQualifications[] {
  return data.map(({ properties }) => ({
    ID: properties.ID.rich_text[0].text.content,
    tab: properties.tab.title[0].text.content as Tab,
    unicon: properties.unicon.rich_text[0].text.content,
    data: serializeQualificationData(properties.data.relation[0]),
  }));
}
