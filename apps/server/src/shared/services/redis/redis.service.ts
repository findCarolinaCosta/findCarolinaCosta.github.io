import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService {
  constructor(private readonly redis: Redis) {}

  public async set<V>(key: string, value: V): Promise<void> {
    const stringValue =
      typeof value === 'string' ? value : JSON.stringify(value);

    await this.redis.set(key, stringValue);
  }

  public async get<R>(key: string): Promise<R | null> {
    const value = await this.redis.get(key);
    return value ? JSON.parse(value) : null;
  }

  public async quit(): Promise<void> {
    await this.redis.quit();
  }

  public async healthCheck(): Promise<{
    status: boolean;
    error?: any;
  }> {
    try {
      await this.redis.ping();
      return {
        status: true,
      };
    } catch (error: any) {
      return {
        status: false,
        error,
      };
    }
  }
}
