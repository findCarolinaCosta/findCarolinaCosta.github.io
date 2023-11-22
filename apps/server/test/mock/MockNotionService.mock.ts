import { Client } from '@notionhq/client';
import { NotionService } from '../../src/shared/services/notion/notion.service';

class MockNotionService extends NotionService {
  constructor() {
    super(new Client());
  }
  create = jest.fn();
  read = jest.fn();
  healthCheck = jest.fn();
}

export default new MockNotionService();
