import { Redis } from 'ioredis';
import { RedisService } from '../../src/shared/services/redis/redis.service';

jest.mock('ioredis', () => {
  return {
    __esModule: true,
    Redis: jest.fn().mockImplementation(() => ({
      set: jest.fn(),
      get: jest.fn(),
      quit: jest.fn(),
    })),
  };
});

class RedisServiceMock extends RedisService {
  constructor() {
    super(new Redis());
  }

  set = jest.fn();
  get = jest.fn();
  quit = jest.fn();
  healthCheck = jest.fn();
}

const RedisServiceMockInstance = new RedisServiceMock();

export { RedisServiceMockInstance };
