import {
  IContentInfo,
  IContentInfoNotionResponse,
} from '../../src/modules/contentInfo/contentInfo.type';
import { AppProviders } from '../../src/shared/constants/app.provider';
import { ContentInfoModule } from '../../src/modules/contentInfo/contentInfo.module';
import { ContentInfoService } from '../../src/modules/contentInfo/contentInfo.service';
import { INestApplication } from '@nestjs/common';
import { NotionReadResult } from '../../src/shared/services/notion/notion.type';
import { NotionResponseContent } from '../mock/NotionResponseContent.mock';
import { RedisServiceMockInstance } from '../mock/RedisService.mock';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import MockNotionServiceMock from '../mock/MockNotionService.mock';

describe('Test the endpoint to retrieve the main content (Integration)', () => {
  let app: INestApplication;

  const MockContentInfoService = new ContentInfoService(
    RedisServiceMockInstance,
    MockNotionServiceMock,
  );

  const ContentInfoSerialized: IContentInfo[] = [
    {
      aboutDescription: 'aboutDescription',
      homeDescription: 'homeDescription',
      homeImg: 'homeImg',
      projects: 0,
      role: 'role',
    },
  ];

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [ContentInfoModule],
      providers: AppProviders,
    })
      .overrideProvider(ContentInfoService)
      .useValue(MockContentInfoService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it('Successfully retrieved content information from Redis without invoking Notion.', () => {
    RedisServiceMockInstance.get.mockImplementation(
      (): Promise<IContentInfo[]> => {
        return Promise.resolve(ContentInfoSerialized);
      },
    );

    expect(MockNotionServiceMock.read).toHaveBeenCalledTimes(0);

    return request(app.getHttpServer())
      .get('/contentInfo')
      .expect(200)
      .expect('Content-Type', /json/)
      .expect({
        ok: true,
        payload: ContentInfoSerialized,
      });
  });

  it('Successfully obtained content information from Notion when there is no cache in Redis', () => {
    RedisServiceMockInstance.get.mockImplementation((): Promise<null> => {
      return Promise.resolve(null);
    });

    MockNotionServiceMock.read.mockImplementation(
      (): Promise<NotionReadResult<IContentInfoNotionResponse>> => {
        return Promise.resolve(NotionResponseContent);
      },
    );

    return request(app.getHttpServer())
      .get('/contentInfo')
      .expect(200)
      .expect('Content-Type', /json/)
      .expect({
        ok: true,
        payload: ContentInfoSerialized,
      });
  });

  it('An error should be returned if empty information is received', () => {
    RedisServiceMockInstance.get.mockImplementation((): Promise<null> => {
      return Promise.resolve(null);
    });

    const emptyNotionResponseContent: NotionReadResult<IContentInfoNotionResponse> =
      {
        results: [],
      };

    MockNotionServiceMock.read.mockImplementation(
      (): Promise<NotionReadResult<IContentInfoNotionResponse>> => {
        return Promise.resolve(emptyNotionResponseContent);
      },
    );

    return request(app.getHttpServer())
      .get('/contentInfo')
      .expect(404)
      .expect('Content-Type', /json/)
      .expect({
        ok: false,
        error: { status: 404, message: 'Content not found' },
      });
  });
});
