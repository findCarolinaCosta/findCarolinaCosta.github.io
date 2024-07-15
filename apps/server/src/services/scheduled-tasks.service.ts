import { Injectable, Logger } from '@nestjs/common';
import { ProjectDto } from '../dto/portfolio.dto';
import * as cron from 'node-cron';
import { Language } from '../shared/constants/language.enum';
import { RedisService } from '../shared/services/redis/redis.service';

@Injectable()
export class ScheduledTasksService {
  private readonly logger = new Logger(ScheduledTasksService.name);

  constructor(private readonly redisService: RedisService) {
    this.scheduleDailyTask();
  }

  private scheduleDailyTask() {
    cron.schedule('0 6 * * *', () => {
      this.handleDailyTask();
    });
  }

  private async handleDailyTask() {
    try {
      await this.redisService.get<ProjectDto[]>(
        `projects_${Language['en-us']}`,
      );

      this.logger.debug('Executando a tarefa diária... OK');
    } catch (e) {
      this.logger.warn(e);
    }
  }
}
