import { AppProviders } from '../../src/shared/constants/app.provider';
import { INestApplication } from '@nestjs/common';
import { NotionReadResult } from '../../src/shared/services/notion/notion.type';
import { PortfolioModule } from '../../src/modules/portfolio/portfolio.module';
import { PortfolioService } from '../../src/modules/portfolio/portfolio.service';
import { ProjectDto, ProjectResponseDto } from '../../src/dto/portfolio.dto';
import { ProjectsResponseInstance } from '../mock/ProjectsResponseInstance.mock';
import { RedisServiceMockInstance } from '../mock/RedisService.mock';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import NotionServiceMock from '../mock/MockNotionService.mock';

describe('portfolioController (Integration)', () => {
  let app: INestApplication;

  const MockPortfolioService = new PortfolioService(
    RedisServiceMockInstance,
    NotionServiceMock,
  );

  const PortfolioSerialized: ProjectDto[] = [
    {
      ID: 'id',
      Code: 'code',
      Description: 'description',
      Image: 'image',
      Title: 'title',
      Demo: 'demo',
    },
  ];

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [PortfolioModule],
      providers: AppProviders,
    })
      .overrideProvider(PortfolioService)
      .useValue(MockPortfolioService)
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

  it('Successfully retrieved portfolio information from Redis without invoking Notion.', async () => {
    RedisServiceMockInstance.get.mockImplementation(
      (): Promise<ProjectDto[]> => {
        return Promise.resolve(PortfolioSerialized);
      },
    );

    expect(NotionServiceMock.read).toHaveBeenCalledTimes(0);
    expect(RedisServiceMockInstance.set).toHaveBeenCalledTimes(0);

    return request(app.getHttpServer()).get('/projects').expect(200).expect({
      ok: true,
      payload: PortfolioSerialized,
    });
  });

  it('Successfully retrieved projects information from Notion and when there is no cache in Redis', async () => {
    RedisServiceMockInstance.get.mockImplementation(
      (): Promise<ProjectDto[]> => {
        return Promise.resolve(null);
      },
    );

    NotionServiceMock.read.mockImplementation(
      (): Promise<NotionReadResult<ProjectDto>> => {
        return Promise.resolve(ProjectsResponseInstance);
      },
    );

    await request(app.getHttpServer()).get('/projects').expect(200).expect({
      ok: true,
      payload: PortfolioSerialized,
    });

    expect(RedisServiceMockInstance.set).toHaveBeenCalledTimes(1);
  });

  it('An error occurs if project information is not provided.', async () => {
    RedisServiceMockInstance.get.mockImplementation((): Promise<null> => {
      return Promise.resolve(null);
    });

    const emptyNotionResponseContent: NotionReadResult<ProjectResponseDto> = {
      results: [],
    };

    NotionServiceMock.read.mockImplementation(
      (): Promise<NotionReadResult<ProjectResponseDto>> => {
        return Promise.resolve(emptyNotionResponseContent);
      },
    );

    await request(app.getHttpServer())
      .get('/projects')
      .expect(404)
      .expect('Content-Type', /json/)
      .expect({
        ok: false,
        error: { status: 404, message: 'Content not found' },
      });

    expect(RedisServiceMockInstance.set).toHaveBeenCalledTimes(0);
  });
});
