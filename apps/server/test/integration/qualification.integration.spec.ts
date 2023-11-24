import { NotionReadResult } from './../../src/shared/services/notion/notion.type';
import { AppProviders } from '../../src/shared/constants/app.provider';
import { INestApplication } from '@nestjs/common';
import {
  QualificationDto,
  QualificationsDto,
} from '../../src/dto/qualification.dto';
import { QualificationModule } from '../../src/modules/qualification/qualification.module';
import { QualificationService } from '../../src/modules/qualification/qualification.service';
import { RedisServiceMockInstance } from '../mock/RedisService.mock';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import NotionServiceMock from '../mock/MockNotionService.mock';
import {
  QualificationResponseDataInstance,
  QualificationSerialized,
  QualificationsResponseInstance,
} from '../mock/QualificationResponseInstance.mock';

describe('qualificationController (Integration)', () => {
  let app: INestApplication;

  const MockQualificationService = new QualificationService(
    RedisServiceMockInstance,
    NotionServiceMock,
  );

  const QualificationsSerialized: QualificationsDto[] = [
    QualificationSerialized,
  ];

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [QualificationModule],
      providers: AppProviders,
    })
      .overrideProvider(QualificationService)
      .useValue(MockQualificationService)
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

  it('Successfully retrieved qualifications information from Redis without invoking Notion.', async () => {
    RedisServiceMockInstance.get.mockImplementation(
      (): Promise<QualificationsDto[]> => {
        return Promise.resolve(QualificationsSerialized);
      },
    );

    await request(app.getHttpServer())
      .get('/qualifications')
      .expect(200)
      .expect('Content-Type', /json/)
      .expect({
        ok: true,
        payload: QualificationsSerialized,
      });

    expect(NotionServiceMock.read).toHaveBeenCalledTimes(0);
    expect(RedisServiceMockInstance.set).toHaveBeenCalledTimes(0);
  });

  it('Successfully retrieved qualifications information from Notion and when there is no cache in Redis.', async () => {
    RedisServiceMockInstance.get.mockImplementation(
      (): Promise<QualificationDto[]> => {
        return Promise.resolve(null);
      },
    );

    NotionServiceMock.read.mockImplementationOnce(
      (): Promise<NotionReadResult<QualificationDto[]>> => {
        return Promise.resolve(QualificationsResponseInstance);
      },
    );

    NotionServiceMock.read.mockImplementationOnce(
      (): Promise<NotionReadResult<QualificationsDto[]>> => {
        return Promise.resolve(QualificationResponseDataInstance);
      },
    );

    await request(app.getHttpServer())
      .get('/qualifications')
      .expect(200)
      .expect('Content-Type', /json/)
      .expect({
        ok: true,
        payload: QualificationsSerialized,
      });

    expect(NotionServiceMock.read).toHaveBeenCalledTimes(2);
    expect(RedisServiceMockInstance.set).toHaveBeenCalledTimes(1);
  });

  it('An error occurs if qualifications information is not provided.', async () => {
    RedisServiceMockInstance.get.mockImplementation((): Promise<null> => {
      return Promise.resolve(null);
    });

    const emptyNotionResponseContent: NotionReadResult<QualificationDto[]> = {
      results: [],
    };

    NotionServiceMock.read.mockImplementation(
      (): Promise<NotionReadResult<QualificationDto[]>> => {
        return Promise.resolve(emptyNotionResponseContent);
      },
    );

    await request(app.getHttpServer())
      .get('/qualifications')
      .expect(404)
      .expect('Content-Type', /json/)
      .expect({
        ok: false,
        error: { status: 404, message: 'Content not found' },
      });
  });
});
