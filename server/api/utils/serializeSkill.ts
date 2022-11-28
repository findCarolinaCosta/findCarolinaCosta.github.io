import { Section } from "../models/IModel";

export interface ISkillItem {
  results: {
    properties: {
      percentage: {
        number: number;
      };
      name: {
        title: {
          text: {
            content: string;
          };
        }[];
      };
    };
  }[];
}

export interface ISkillResponse {
  properties: {
    skillsList: {
      relation: ISkillItem[];
    };
    unicons: {
      rich_text: {
        text: {
          content: string;
        };
      }[];
    };
    subtitle: {
      rich_text: {
        text: {
          content: string;
        };
      }[];
    };
    ID: {
      rich_text: {
        content: string;
        link: null;
      }[];
    };
    section: {
      select: {
        name: Section;
      };
    };
    title: {
      id: "title";
      type: "title";
      title: {
        text: {
          content: string;
        };
      }[];
    };
  };
}

export interface ISkillReturn {
  ID?: string;
  title: string;
  subtitle: string;
  unicons: string;
  section: Section;
  skillsList: {
    name: string;
    percentage: number;
  }[];
}

function serializeSkillList(data: ISkillItem): {
  name: string;
  percentage: number;
}[] {
  return data.results.map((item) => ({
    name: item.properties.name.title[0].text.content,
    percentage: item.properties.percentage.number,
  }));
}

export function serializeSkill(data: ISkillResponse[]): ISkillReturn[] {
  return data
    .map(({ properties }) => ({
      title: properties.title.title[0].text.content,
      subtitle: properties.subtitle.rich_text[0].text.content,
      unicons: properties.unicons.rich_text[0].text.content,
      section: properties.section.select.name,
      skillsList: serializeSkillList(properties.skillsList.relation[0]).sort(
        (a, b) => b.percentage - a.percentage
      ),
    }))
    .sort(
      (a, b) =>
        Number(b.subtitle.replace(/\D/gim, "")) -
        Number(a.subtitle.replace(/\D/gim, ""))
    );
}
