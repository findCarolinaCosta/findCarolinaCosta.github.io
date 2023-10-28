import { PortfolioService } from './portfolio.service';
import { Controller, Get, Injectable, Req } from '@nestjs/common';
import { Language } from 'src/shared/constants/language.enum';
import { Request } from 'express';
import { ProjectDto } from 'src/dto/portfolio.dto';

@Injectable()
@Controller('projects')
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) {}

  @Get()
  getProjects(@Req() req: Request): Promise<ProjectDto[]> {
    try {
      const language =
        Language[req.query.language as Language] || Language.ENGLISH;
      const content = this.portfolioService.getProjects(language);

      if (!content) throw new Error('Content not found');

      return content;
    } catch (error) {
      throw error;
    }
  }
}
