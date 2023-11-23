import { PortfolioService } from './portfolio.service';
import {
  Controller,
  Get,
  HttpException,
  Injectable,
  Query,
} from '@nestjs/common';
import { Language } from '../../shared/constants/language.enum';
import { ProjectDto } from '../../dto/portfolio.dto';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { ApiProperty, ApiQuery, ApiTags } from '@nestjs/swagger';
import { SwaggerResponsesDecorators } from 'shared/constants/swagger.decorators';
import { ResponsePattern } from '../../interceptors/response.interceptor';

class ProjectsResponse implements ResponsePattern<ProjectDto[]> {
  @ApiProperty({ default: true })
  ok: boolean;
  @ApiProperty({ type: [ProjectDto] })
  payload: ProjectDto[];
}

@Injectable()
@Controller('projects')
@ApiTags('Projects')
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) {}

  @Get()
  @ApiQuery({ name: 'language', enum: Language })
  @SwaggerResponsesDecorators(
    [
      {
        status: StatusCodes.OK,
        description: ReasonPhrases.OK,
        type: ProjectsResponse,
      },
    ],
    [StatusCodes.NOT_FOUND],
  )
  async getProjects(
    @Query('language') language: Language = Language['en-us'],
  ): Promise<ProjectDto[]> {
    try {
      const content = await this.portfolioService.getProjects(language);

      if (!content.length)
        throw new HttpException('Content not found', StatusCodes.NOT_FOUND);

      return content;
    } catch (error) {
      throw error;
    }
  }
}
