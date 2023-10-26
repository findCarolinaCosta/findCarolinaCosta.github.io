import { Provider } from '@nestjs/common';
import { Client } from '@notionhq/client';

export const NotionClientProvider: Provider = {
  provide: Client,
  useFactory: () => {
    return new Client({
      auth: process.env.NOTION_PORTFOLIO_KEY,
    });
  },
};
