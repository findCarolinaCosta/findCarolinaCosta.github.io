import {
  SolutionDataResponseInstance,
  SolutionSerialized,
  SolutionsResponseInstance,
} from '../mock/SolutionResponseInstance.mock';
import { AppProviders } from '../../src/shared/constants/app.provider';
import { INestApplication } from '@nestjs/common';
import { NotionReadResult } from '../../src/shared/services/notion/notion.type';
import { RedisServiceMockInstance } from '../mock/RedisService.mock';
import { SolutionDto } from '../../src/dto/solution.dto';
import { SolutionModule } from '../../src/modules/solution/solution.module';
import { SolutionService } from '../../src/modules/solution/solution.service';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import NotionServiceMock from '../mock/MockNotionService.mock';

describe('solutionController (Integration)', () => {
  let app: INestApplication;

  const MockSolutionService = new SolutionService(
    RedisServiceMockInstance,
    NotionServiceMock,
  );

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [SolutionModule],
      providers: AppProviders,
    })
      .overrideProvider(SolutionService)
      .useValue(MockSolutionService)
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

  it('Successfully retrieved solutions information from Redis without invoking Notion.', async () => {
    RedisServiceMockInstance.get.mockImplementation(
      (): Promise<SolutionDto[]> => {
        return Promise.resolve(SolutionSerialized);
      },
    );

    await request(app.getHttpServer())
      .get('/solutions')
      .expect(200)
      .expect('Content-Type', /json/)
      .expect({
        ok: true,
        payload: SolutionSerialized,
      });

    expect(NotionServiceMock.read).toHaveBeenCalledTimes(0);
    expect(RedisServiceMockInstance.set).toHaveBeenCalledTimes(0);
  });

  it('Successfully retrieved solutions information from Notion and when there is no cache in Redis', async () => {
    RedisServiceMockInstance.get.mockImplementation(
      (): Promise<SolutionDto[]> => {
        return Promise.resolve(null);
      },
    );

    NotionServiceMock.read.mockImplementationOnce(
      (): Promise<NotionReadResult<SolutionDto[]>> => {
        return Promise.resolve(SolutionsResponseInstance);
      },
    );

    NotionServiceMock.read.mockImplementationOnce(
      (): Promise<NotionReadResult<string[]>> => {
        return Promise.resolve(SolutionDataResponseInstance);
      },
    );

    await request(app.getHttpServer())
      .get('/solutions')
      .expect(200)
      .expect('Content-Type', /json/)
      .expect({
        ok: true,
        payload: SolutionSerialized,
      });

    expect(NotionServiceMock.read).toHaveBeenCalledTimes(2);
    expect(RedisServiceMockInstance.set).toHaveBeenCalledTimes(1);
  });

  it('An error occurs if solutions information is not provided.', async () => {
    RedisServiceMockInstance.get.mockImplementation(
      (): Promise<SolutionDto[]> => {
        return Promise.resolve(null);
      },
    );

    const emptyNotionResponseContent: NotionReadResult<SolutionDto> = {
      results: [],
    };

    NotionServiceMock.read.mockImplementation(
      (): Promise<NotionReadResult<SolutionDto>> => {
        return Promise.resolve(emptyNotionResponseContent);
      },
    );

    await request(app.getHttpServer())
      .get('/solutions')
      .expect(404)
      .expect('Content-Type', /json/)
      .expect({
        ok: false,
        error: { status: 404, message: 'Content not found' },
      });
  });
});
