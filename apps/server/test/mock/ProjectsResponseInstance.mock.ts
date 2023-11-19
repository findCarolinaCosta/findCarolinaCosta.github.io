import { ProjectDto, ProjectResponseDto } from '../../src/dto/portfolio.dto';
import { NotionReadResult } from '../../src/shared/services/notion/notion.type';

class ProjectsResponseNotionDefault extends ProjectResponseDto {
  constructor({ Code, Demo, Description, ID, Image, Title }: ProjectDto) {
    super();
    this.Code = Code;
    this.Demo = Demo;
    this.Description = Description;
    this.ID = ID;
    this.Image = Image;
    this.Title = Title;
  }

  toTransformedNotionDefault(): NotionReadResult<any> {
    return {
      results: [
        {
          properties: {
            Code: {
              type: 'url',
              url: this.Code,
            },
            Demo: {
              type: 'url',
              url: this.Demo,
            },
            Description: {
              type: 'rich_text',
              rich_text: [
                {
                  type: 'text',
                  text: {
                    content: this.Description,
                  },
                },
              ],
            },
            ID: {
              type: 'rich_text',
              rich_text: [
                {
                  type: 'text',
                  text: {
                    content: this.ID,
                  },
                },
              ],
            },
            Image: {
              type: 'url',
              url: this.Image,
            },
            Title: {
              type: 'title',
              title: [
                {
                  type: 'text',
                  text: {
                    content: this.Title,
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

export const ProjectsResponseInstance = new ProjectsResponseNotionDefault({
  Code: 'code',
  Demo: 'demo',
  Description: 'description',
  ID: 'id',
  Image: 'image',
  Title: 'title',
}).toTransformedNotionDefault();
