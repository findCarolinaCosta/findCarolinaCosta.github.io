import {
  Controller,
  Get,
  HttpException,
  Injectable,
  Req,
} from '@nestjs/common';
import { ContentInfoService } from './contentInfo.service';
import { Language } from '../../shared/constants/language.enum';
import { IContentInfo } from './contentInfo.type';
import { Request } from 'express';
import { StatusCodes } from 'http-status-codes';

@Injectable()
@Controller('contentInfo')
export class ContentInfoController {
  constructor(private readonly contentInfoService: ContentInfoService) {}

  @Get()
  async getContentInfo(@Req() req: Request): Promise<IContentInfo[]> {
    try {
      const language =
        Language[req.query.language as Language] || Language.ENGLISH;

      const content = await this.contentInfoService.getContentInfo(language);

      if (!content.length)
        throw new HttpException('Content not found', StatusCodes.NOT_FOUND);

      return content;
    } catch (error) {
      throw error;
    }
  }
}
