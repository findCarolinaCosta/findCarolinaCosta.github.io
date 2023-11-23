import {
  Controller,
  Get,
  HttpException,
  Injectable,
  Query,
} from '@nestjs/common';
import { Language } from '../../shared/constants/language.enum';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { ApiProperty, ApiQuery, ApiTags } from '@nestjs/swagger';
import { SwaggerResponsesDecorators } from 'shared/constants/swagger.decorators';
import { ResponsePattern } from 'interceptors/response.interceptor';
import { ContentInfoService } from './contentInfo.service';
import { ContentInfoDto } from '../../dto/contentInfo.dto';

class ContentInfoResponse implements ResponsePattern<ContentInfoDto[]> {
  @ApiProperty({ default: true })
  ok: boolean;
  @ApiProperty({ type: [ContentInfoDto] })
  payload: ContentInfoDto[];
}

@Injectable()
@Controller('contentInfo')
@ApiTags('Content Info')
export class ContentInfoController {
  constructor(private readonly contentInfoService: ContentInfoService) {}

  @Get()
  @ApiQuery({ name: 'language', enum: Language })
  @SwaggerResponsesDecorators(
    [
      {
        status: StatusCodes.OK,
        description: ReasonPhrases.OK,
        type: ContentInfoResponse,
      },
    ],
    [StatusCodes.NOT_FOUND],
  )
  async getContentInfo(
    @Query('language') language: Language = Language['en-us'],
  ): Promise<ContentInfoDto[]> {
    try {
      const content = await this.contentInfoService.getContentInfo(language);

      if (!content.length)
        throw new HttpException('Content not found', StatusCodes.NOT_FOUND);

      return content;
    } catch (error) {
      throw error;
    }
  }
}
