import { QualificationService } from './qualification.service';
import {
  Controller,
  Get,
  HttpException,
  Injectable,
  Query,
} from '@nestjs/common';
import { QualificationsDto } from '../../dto/qualification.dto';
import { Language } from '../../shared/constants/language.enum';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { ApiProperty, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ResponsePattern } from 'interceptors/response.interceptor';
import { SwaggerResponsesDecorators } from 'shared/constants/swagger.decorators';

class QualificationsResponse implements ResponsePattern<QualificationsDto[]> {
  @ApiProperty({ default: true })
  ok: boolean;
  @ApiProperty({ type: [QualificationsDto] })
  payload: QualificationsDto[];
}

@Injectable()
@Controller('qualifications')
@ApiTags('Qualifications')
export class QualificationController {
  constructor(private readonly qualificationService: QualificationService) {}

  @Get()
  @ApiQuery({ name: 'language', enum: Language })
  @SwaggerResponsesDecorators(
    [
      {
        status: StatusCodes.OK,
        description: ReasonPhrases.OK,
        type: QualificationsResponse,
      },
    ],
    [StatusCodes.NOT_FOUND],
  )
  async getQualifications(
    @Query('language') language: Language = Language['en-us'],
  ): Promise<QualificationsDto[]> {
    try {
      const qualifications =
        await this.qualificationService.getQualifications(language);

      if (!qualifications.length)
        throw new HttpException('Content not found', StatusCodes.NOT_FOUND);

      return qualifications;
    } catch (error) {
      throw error;
    }
  }
}
