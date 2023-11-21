import { Injectable } from '@nestjs/common';
import {
  HealthCheckError,
  HealthCheckResult,
  HealthCheckService,
  HealthIndicatorFunction,
} from '@nestjs/terminus';
import axios from 'axios';
import { NotionService } from '../../shared/services/notion/notion.service';
import { RedisService } from '../../shared/services/redis/redis.service';

@Injectable()
export class HealthService {
  constructor(
    private readonly health: HealthCheckService,
    private readonly redisService: RedisService,
    private readonly notionService: NotionService,
  ) {}

  public async healthCheck(): Promise<HealthCheckResult | HealthCheckError> {
    const healthIndicators: HealthIndicatorFunction[] = [
      await this.checkNotionHealth(),
      await this.checkRedisHealth(),
      ...(await this.checkClientOrigin()),
    ];

    const checkHealthResult: HealthCheckResult =
      await this.health.check(healthIndicators);

    return checkHealthResult;
  }

  private async checkNotionHealth(): Promise<HealthIndicatorFunction> {
    const checkConnectionNotion = await this.notionService.healthCheck();

    return async () => {
      if (!checkConnectionNotion.status)
        throw new HealthCheckError('Notion is down', {
          notion: {
            status: 'down',
            message: checkConnectionNotion?.error?.message || 'Notion is down',
          },
        });

      return {
        notion: {
          status: 'up',
        },
      };
    };
  }

  private async checkRedisHealth(): Promise<HealthIndicatorFunction> {
    const checkConnectionRedis = await this.redisService.healthCheck();

    return async () => {
      if (!checkConnectionRedis.status)
        throw new HealthCheckError('Redis is down', {
          redis: {
            status: 'down',
            message: checkConnectionRedis?.error?.message || 'Redis is down',
          },
        });

      return {
        redis: {
          status: 'up',
        },
      };
    };
  }

  private async checkClientOrigin(): Promise<HealthIndicatorFunction[]> {
    const originsResults = {
      errors: {
        origins: [],
      },
      success: {
        origins: [],
      },
    };
    const origins = process.env.ORIGINS?.split(',');

    const healthIndicators: HealthIndicatorFunction[] = [];

    for (const [index, origin] of origins.entries()) {
      healthIndicators.push(async () => {
        try {
          const originName = origin.split('//')[1];
          try {
            const originName = origin.split('//')[1];
            const response = await axios.get(origin);

            if (response.status >= 400) {
              originsResults.errors.origins.push({
                status: 'down',
                origin: originName,
                statusCode: response.status,
                message: response.statusText,
              });
            } else {
              originsResults.success.origins.push({
                origin: originName,
              });
            }
          } catch (error) {
            originsResults.errors.origins.push({
              status: 'down',
              origin: originName,
              message: error?.message,
            });
          }

          if (originsResults.success.origins.length > 0) {
            return {
              clients: {
                status: 'up',
                ...originsResults.success,
              },
            };
          }
        } finally {
          const isLastOrigin = origins.length - 1 == index;
          const haveOriginsErrors = originsResults.errors.origins.length > 0;

          if (isLastOrigin && haveOriginsErrors) {
            throw new HealthCheckError('Web is down', originsResults.errors);
          }
        }
      });
    }

    return healthIndicators;
  }
}
