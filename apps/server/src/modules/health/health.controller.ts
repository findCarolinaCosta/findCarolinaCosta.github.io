import { Controller, Get, Injectable, UseGuards } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckError,
  HealthCheckResult,
} from '@nestjs/terminus';
import { HealthService } from './health.service';
import { BasicAuthGuard } from '../../shared/auth/basic-auth.guard';
import { ApiBasicAuth, ApiTags } from '@nestjs/swagger';
import { SwaggerResponsesDecorators } from '../../shared/constants/swagger.decorators';

@Injectable()
@Controller('health')
@ApiBasicAuth()
@ApiTags('Health check')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  @UseGuards(BasicAuthGuard)
  @HealthCheck()
  @SwaggerResponsesDecorators()
  async check(): Promise<HealthCheckResult | HealthCheckError> {
    return this.healthService.healthCheck();
  }
}
