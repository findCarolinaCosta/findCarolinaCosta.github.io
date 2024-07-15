import { Provider } from '@nestjs/common';
import { Redis } from 'ioredis';

interface RedisError extends Error {
  code?: string;
}

export const RedisProvider: Provider = {
  provide: Redis,
  useFactory: () => {
    const redisHost = process.env.REDIS_HOST || '';
    const redisPort = Number(process.env.REDIS_PORT) || 6379;
    const redisUser = process.env.REDIS_USER || '';
    const redisPassword = process.env.REDIS_PASSWORD || '';

    const redis = new Redis({
      host: redisHost,
      port: redisPort,
      username: redisUser,
      password: redisPassword,
      connectTimeout: 5000,
      retryStrategy: (times) => {
        if (times >= 1) {
          return null;
        }
        return 3000;
      },
    });

    redis.on('error', (err: RedisError) => {
      console.error(err);
    });

    return redis;
  },
};
