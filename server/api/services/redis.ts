import Redis from "ioredis";

class RedisClient {
  private _redis: Redis;

  constructor(redis: Redis) {
    this._redis = redis;
  }

  public async set(key: string, value: any) {
    if (typeof value === "object") value = JSON.stringify(value);

    await this._redis.set(key, value);
  }

  public async get(key: string) {
    const value = await this._redis.get(key);
    return value ? JSON.parse(value) : null;
  }

  public async quit() {
    await this._redis.quit();
  }
}

const redisHost = process.env.REDIS_HOST || "";
const redisPort = Number(process.env.REDIS_PORT) || 6379;
const redisUser = process.env.REDIS_USER || "";
const redisPassword = process.env.REDIS_PASSWORD || "";

const redisInstance = new Redis({
  host: redisHost,
  port: redisPort,
  username: redisUser,
  password: redisPassword,
});

const redis = new RedisClient(redisInstance);

export { redis };
