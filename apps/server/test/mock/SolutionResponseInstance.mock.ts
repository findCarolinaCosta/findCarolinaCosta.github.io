import { SolutionListDto } from '../../src/modules/solution/solution.type';
import { SolutionDto } from '../../src/dto/solution.dto';
import { NotionReadResult } from '../../src/shared/services/notion/notion.type';
import { Section } from '../../src/dto/skill.dto';

export const SolutionDataSerialized: SolutionListDto = {
  service: 'Web page development.',
};

export const SolutionSerialized: SolutionDto[] = [
  {
    title: 'title',
    solutionsList: [SolutionDataSerialized.service],
  },
];

class SolutionResponseNotionDefault extends SolutionDto {
  constructor({ solutionsList, title, tag }: SolutionDto) {
    super();
    this.solutionsList = solutionsList;
    this.title = title;
    this.tag = tag;
  }

  toTransformedNotionDefault(): NotionReadResult<any> {
    return {
      results: [
        {
          properties: {
            title: {
              title: [
                {
                  text: {
                    content: this.title,
                  },
                },
              ],
            },
            tag: {
              select: {
                name: this.tag,
              },
            },
            solutionsList: {
              rich_text: this.solutionsList.map((solution) => ({
                text: {
                  content: solution,
                },
              })),
            },
          },
        },
      ],
    };
  }
}

export const SolutionsResponseInstance = new SolutionResponseNotionDefault({
  title: SolutionSerialized[0].title,
  tag: Section.BACKEND,
  solutionsList: SolutionSerialized[0].solutionsList,
}).toTransformedNotionDefault();

class SolutionDataResponseNotion extends SolutionListDto {
  constructor({ service }: SolutionListDto) {
    super();
    this.service = service;
  }

  toTransformedNotionDefault(): NotionReadResult<any> {
    return {
      results: [
        {
          properties: {
            service: {
              title: [
                {
                  text: {
                    content: this.service,
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

export const SolutionDataResponseInstance = new SolutionDataResponseNotion(
  SolutionDataSerialized,
).toTransformedNotionDefault();
