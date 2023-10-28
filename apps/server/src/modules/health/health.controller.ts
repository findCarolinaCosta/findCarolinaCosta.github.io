import { Controller, Get, Injectable } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckError,
  HealthCheckResult,
} from '@nestjs/terminus';
import { HealthService } from './health.service';

@Injectable()
@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  @HealthCheck()
  async check(): Promise<HealthCheckResult | HealthCheckError> {
    return this.healthService.healthCheck();
  }
}
