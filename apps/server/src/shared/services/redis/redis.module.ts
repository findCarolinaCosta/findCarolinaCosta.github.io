import { Global, Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import { RedisProvider } from './redis.provider';

@Global()
@Module({
  imports: [],
  providers: [RedisProvider, RedisService],
  exports: [RedisService],
})
export class RedisModule {}
