import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import {
  HealthCheckResult,
  HealthCheckService,
  HealthIndicatorFunction,
} from '@nestjs/terminus';

@Injectable()
class MockHealthCheckService extends HealthCheckService {
  constructor() {
    super(null, null, null);
  }

  check = jest
    .fn()
    .mockImplementation(
      async (
        indicators: HealthIndicatorFunction[],
      ): Promise<HealthCheckResult> => {
        const results: HealthCheckResult = {
          error: {},
          status: 'ok',
          details: {},
          info: {},
        };

        for (const indicator of indicators) {
          try {
            results.info = { ...results.info, ...(await indicator()) };
          } catch (e) {
            results.status = 'error';
            results.error = {
              ...results.error,
              ...e.causes,
            };
          }
        }

        results.details = {
          ...results.error,
          ...results.info,
        };

        if (this.isNotEmptyObject(results.error))
          throw new ServiceUnavailableException(results, 'Health check failed');

        return results;
      },
    );

  private isNotEmptyObject(obj: object): boolean {
    return Object.entries(obj).length != 0;
  }
}

export const MockHealthCheckServiceInstance = new MockHealthCheckService();
