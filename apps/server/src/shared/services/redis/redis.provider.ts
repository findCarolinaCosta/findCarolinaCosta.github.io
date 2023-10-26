import { Provider } from '@nestjs/common';
import { Redis } from 'ioredis';

export const RedisProvider: Provider = {
  provide: Redis,
  useFactory: () => {
    const redisHost = process.env.REDIS_HOST || '';
    const redisPort = Number(process.env.REDIS_PORT) || 6379;
    const redisUser = process.env.REDIS_USER || '';
    const redisPassword = process.env.REDIS_PASSWORD || '';

    return new Redis({
      host: redisHost,
      port: redisPort,
      username: redisUser,
      password: redisPassword,
    });
  },
};
