import { AppProviders } from '../../src/shared/constants/app.provider';
import { HealthModule } from '../../src/modules/health/health.module';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { HealthCheckResult, HealthIndicatorResult } from '@nestjs/terminus';
import { HealthService } from '../../src/modules/health/health.service';
import { RedisServiceMockInstance } from '../mock/RedisService.mock';
import MockNotionService from '../mock/MockNotionService.mock';
import { ConfigModule } from '@nestjs/config';
import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';
import { MockHealthCheckServiceInstance } from '../mock/MockHealthCheckService';

describe('health (Integration)', () => {
  let app: INestApplication;
  const axiosMock = new AxiosMockAdapter(axios);

  beforeAll(async () => {
    const MockHealthService = new HealthService(
      MockHealthCheckServiceInstance,
      RedisServiceMockInstance,
      MockNotionService,
    );

    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [
        HealthModule,
        ConfigModule.forRoot({
          envFilePath: '.env.test',
          isGlobal: true,
        }),
      ],
      providers: AppProviders,
    })
      .overrideProvider(HealthService)
      .useValue(MockHealthService)
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
    axiosMock.reset();
  });

  it('Success in all health checks', async () => {
    RedisServiceMockInstance.healthCheck = jest.fn().mockResolvedValue({
      status: true,
    });

    MockNotionService.healthCheck = jest.fn().mockResolvedValue({
      status: true,
    });

    const origins = process.env.ORIGINS?.split(',');

    origins.forEach((origin) => {
      axiosMock.onGet(origin).reply(200);
    });

    const info: HealthIndicatorResult = {
      clients: {
        status: 'up',
        origins: origins.map((origin) => ({
          origin: origin.split('//')[1],
        })),
      },
      notion: {
        status: 'up',
      },
      redis: {
        status: 'up',
      },
    };

    const healthCheckResult: HealthCheckResult = {
      status: 'ok',
      error: {},
      details: {
        ...info,
      },
      info,
    };

    await request(app.getHttpServer())
      .get('/health')
      .expect(200)
      .expect('Content-Type', /json/)
      .expect({
        ok: true,
        payload: healthCheckResult,
      });

    expect(RedisServiceMockInstance.healthCheck).toHaveBeenCalledTimes(1);
    expect(MockNotionService.healthCheck).toHaveBeenCalledTimes(1);
    expect(MockHealthCheckServiceInstance.check).toHaveBeenCalledTimes(1);
  });

  it('Expected errors from health checks', async () => {
    const origins = process.env.ORIGINS?.split(',');

    const errors: HealthIndicatorResult = {
      redis: {
        status: 'down',
        message: 'Redis is down',
      },
      notion: {
        status: 'down',
        message: 'Notion is down',
      },
      origins: origins.map((origin) => ({
        status: 'down',
        origin: origin.split('//')[1],
        message: 'Request failed with status code 500',
      })) as any,
    };

    RedisServiceMockInstance.healthCheck = jest.fn().mockImplementation(() => ({
      status: false,
      error: errors.redis.message,
    }));

    MockNotionService.healthCheck = jest.fn().mockImplementation(() => ({
      status: false,
      error: errors.notion.message,
    }));

    origins.forEach((origin) => {
      axiosMock.onGet(origin).reply(500);
    });

    const healthCheckResult: HealthCheckResult = {
      info: {},
      status: 'error',
      error: {
        ...errors,
      },
      details: {
        ...errors,
      },
    };

    await request(app.getHttpServer())
      .get('/health')
      .expect(503)
      .expect('Content-Type', /json/)
      .expect(healthCheckResult);

    expect(RedisServiceMockInstance.healthCheck).toHaveBeenCalledTimes(1);
    expect(MockNotionService.healthCheck).toHaveBeenCalledTimes(1);
    expect(MockHealthCheckServiceInstance.check).toHaveBeenCalledTimes(1);
  });
});
