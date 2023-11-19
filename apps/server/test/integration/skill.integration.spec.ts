import {
  SkillDataResponseInstance,
  SkillSerialized,
  SkillsResponseInstance,
} from '../mock/SkillResponseInstance';
import { AppProviders } from '../../src/shared/constants/app.provider';
import { INestApplication } from '@nestjs/common';
import { ISkill, SkillListDto } from '../../src/dto/skill.dto';
import { NotionReadResult } from '../../src/shared/services/notion/notion.type';
import { RedisServiceMockInstance } from '../mock/RedisService.mock';
import { SkillModule } from '../../src/modules/skill/skill.module';
import { SkillService } from '../../src/modules/skill/skill.service';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import NotionServiceMock from '../mock/MockNotionService.mock';

describe('skillController (Integration)', () => {
  let app: INestApplication;

  const MockSkillService = new SkillService(
    RedisServiceMockInstance,
    NotionServiceMock,
  );

  const SkillsSerialized: SkillListDto[] = [SkillSerialized];

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [SkillModule],
      providers: AppProviders,
    })
      .overrideProvider(SkillService)
      .useValue(MockSkillService)
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

  it('Successfully retrieved skills information from Redis without invoking Notion.', async () => {
    RedisServiceMockInstance.get.mockImplementation(
      (): Promise<SkillListDto[]> => {
        return Promise.resolve(SkillsSerialized);
      },
    );

    await request(app.getHttpServer())
      .get('/skills')
      .expect(200)
      .expect('Content-Type', /json/)
      .expect({
        ok: true,
        payload: SkillsSerialized,
      });

    expect(NotionServiceMock.read).toHaveBeenCalledTimes(0);
    expect(RedisServiceMockInstance.get).toHaveBeenCalledTimes(1);
    expect(RedisServiceMockInstance.set).toHaveBeenCalledTimes(0);
  });

  it('Successfully retrieved skills information from Notion and when there is no cache in Redis.', async () => {
    RedisServiceMockInstance.get.mockImplementation(
      (): Promise<SkillListDto[]> => {
        return Promise.resolve(null);
      },
    );

    NotionServiceMock.read.mockImplementationOnce(
      (): Promise<NotionReadResult<SkillListDto[]>> => {
        return Promise.resolve(SkillsResponseInstance);
      },
    );

    NotionServiceMock.read.mockImplementationOnce(
      (): Promise<NotionReadResult<ISkill[]>> => {
        return Promise.resolve(SkillDataResponseInstance);
      },
    );

    await request(app.getHttpServer())
      .get('/skills')
      .expect(200)
      .expect('Content-Type', /json/)
      .expect({
        ok: true,
        payload: SkillsSerialized,
      });

    expect(NotionServiceMock.read).toHaveBeenCalledTimes(2);
    expect(RedisServiceMockInstance.set).toHaveBeenCalledTimes(1);
  });

  it('An error occurs if skills information is not provided.', async () => {
    RedisServiceMockInstance.get.mockImplementation(
      (): Promise<SkillListDto[]> => {
        return Promise.resolve(null);
      },
    );

    const emptyNotionResponseContent: NotionReadResult<SkillListDto[]> = {
      results: [],
    };

    NotionServiceMock.read.mockImplementationOnce(
      (): Promise<NotionReadResult<SkillListDto[]>> => {
        return Promise.resolve(emptyNotionResponseContent);
      },
    );

    NotionServiceMock.read.mockImplementationOnce(
      (): Promise<NotionReadResult<ISkill[]>> => {
        return Promise.resolve(null);
      },
    );

    await request(app.getHttpServer())
      .get('/skills')
      .expect(404)
      .expect('Content-Type', /json/)
      .expect({
        ok: false,
        error: { status: 404, message: 'Content not found' },
      });
  });
});
