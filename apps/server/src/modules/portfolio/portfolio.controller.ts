import { PortfolioService } from './portfolio.service';
import {
  Controller,
  Get,
  HttpException,
  Injectable,
  Req,
} from '@nestjs/common';
import { Language } from '../../shared/constants/language.enum';
import { Request } from 'express';
import { ProjectDto } from '../../dto/portfolio.dto';
import { StatusCodes } from 'http-status-codes';

@Injectable()
@Controller('projects')
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) {}

  @Get()
  async getProjects(@Req() req: Request): Promise<ProjectDto[]> {
    try {
      const language =
        Language[req.query.language as Language] || Language.ENGLISH;
      const content = await this.portfolioService.getProjects(language);

      if (!content.length)
        throw new HttpException('Content not found', StatusCodes.NOT_FOUND);

      return content;
    } catch (error) {
      throw error;
    }
  }
}
