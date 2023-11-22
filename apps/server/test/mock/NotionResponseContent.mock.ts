import { IContentInfoNotionResponse } from '../../src/modules/contentInfo/contentInfo.type';
import { NotionReadResult } from '../../src/shared/services/notion/notion.type';

const NotionResponseContent: NotionReadResult<IContentInfoNotionResponse> = {
  results: [
    {
      properties: {
        aboutDescription: {
          rich_text: [
            {
              text: {
                content: 'aboutDescription',
              },
            },
          ],
        },
        homeDescription: {
          rich_text: [
            {
              text: {
                content: 'homeDescription',
              },
            },
          ],
        },
        homeImg: {
          url: 'homeImg',
        },
        projects: {
          number: 0,
        },
        role: {
          title: [
            {
              text: {
                content: 'role',
              },
            },
          ],
        },
      },
    },
  ],
};

export { NotionResponseContent };
