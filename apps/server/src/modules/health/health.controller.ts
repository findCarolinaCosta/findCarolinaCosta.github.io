import { Controller, Get, Injectable, UseGuards } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckError,
  HealthCheckResult,
} from '@nestjs/terminus';
import { HealthService } from './health.service';
import { BasicAuthGuard } from '../auth/basic-auth.guard';

@Injectable()
@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  @UseGuards(BasicAuthGuard)
  @HealthCheck()
  async check(): Promise<HealthCheckResult | HealthCheckError> {
    return this.healthService.healthCheck();
  }
}
