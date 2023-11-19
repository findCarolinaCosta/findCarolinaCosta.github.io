import {
  ISkill,
  ISkillList,
  Section,
  SkillDto,
  SkillListDto,
} from '../../src/dto/skill.dto';
import { NotionReadResult } from '../../src/shared/services/notion/notion.type';

export const SkillDataSerialized: ISkill = {
  name: 'NODEJS',
  percentage: 100,
};

export const SkillSerialized: ISkillList = {
  ID: 'id',
  section: Section.BACKEND,
  subtitle: 'subtitle',
  title: 'title',
  unicons: 'unicons',
  skillsList: [SkillDataSerialized],
};

class SkillResponseNotionDefault extends SkillListDto {
  constructor({ ID, section, subtitle, title, unicons }: ISkillList) {
    super();
    this.ID = ID;
    this.section = section;
    this.subtitle = subtitle;
    this.title = title;
    this.unicons = unicons;
  }

  toTransformedNotionDefault(): NotionReadResult<any> {
    return {
      results: [
        {
          properties: {
            ID: {
              rich_text: [
                {
                  text: {
                    content: this.ID,
                  },
                },
              ],
            },
            section: {
              select: {
                name: this.section,
              },
            },
            subtitle: {
              rich_text: [
                {
                  text: {
                    content: this.subtitle,
                  },
                },
              ],
            },
            title: {
              title: [
                {
                  text: {
                    content: this.title,
                  },
                },
              ],
            },
            unicons: {
              rich_text: [
                {
                  text: {
                    content: this.unicons,
                  },
                },
              ],
            },
          },
        },
      ],
    };
  }
}

export const SkillsResponseInstance = new SkillResponseNotionDefault(
  SkillSerialized,
).toTransformedNotionDefault();

class SkillDataResponseNotion extends SkillDto {
  constructor({ name, percentage }: SkillDto) {
    super();
    this.name = name;
    this.percentage = percentage;
  }

  toTransformedNotionDefault(): NotionReadResult<any> {
    return {
      results: [
        {
          properties: {
            name: {
              title: [
                {
                  text: {
                    content: this.name,
                  },
                },
              ],
            },
            percentage: {
              number: this.percentage,
            },
          },
        },
      ],
    };
  }
}

export const SkillDataResponseInstance = new SkillDataResponseNotion(
  SkillDataSerialized,
).toTransformedNotionDefault();
