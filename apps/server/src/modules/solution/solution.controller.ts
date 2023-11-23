import {
  Controller,
  Get,
  HttpException,
  Injectable,
  Query,
} from '@nestjs/common';
import { Language } from '../../shared/constants/language.enum';
import { SolutionDto } from '../../dto/solution.dto';
import { SolutionService } from './solution.service';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { ApiProperty, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ResponsePattern } from 'interceptors/response.interceptor';
import { SwaggerResponsesDecorators } from 'shared/constants/swagger.decorators';

class SolutionsResponse implements ResponsePattern<SolutionDto[]> {
  @ApiProperty({ default: true })
  ok: boolean;
  @ApiProperty({ type: [SolutionDto] })
  payload: SolutionDto[];
}

@Injectable()
@Controller('solutions')
@ApiTags('Solutions')
export class SolutionController {
  constructor(private solutionService: SolutionService) {}

  @Get()
  @ApiQuery({ name: 'language', enum: Language })
  @SwaggerResponsesDecorators(
    [
      {
        status: StatusCodes.OK,
        description: ReasonPhrases.OK,
        type: SolutionsResponse,
      },
    ],
    [StatusCodes.NOT_FOUND],
  )
  async getSolutions(
    @Query('language') language: Language = Language['en-us'],
  ): Promise<SolutionDto[]> {
    try {
      const solutions = await this.solutionService.getSolutions(language);

      if (!solutions.length)
        throw new HttpException('Content not found', StatusCodes.NOT_FOUND);

      return solutions;
    } catch (error) {
      throw error;
    }
  }
}
