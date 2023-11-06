import { Controller, Get, Injectable, Req } from '@nestjs/common';
import { ContentInfoService } from './contentInfo.service';
import { Language } from 'shared/constants/language.enum';
import { IContentInfo } from './contentInfo.type';
import { Request } from 'express';

@Injectable()
@Controller('contentInfo')
export class ContentInfoController {
  constructor(private readonly contentInfoService: ContentInfoService) {}

  @Get()
  getContentInfo(@Req() req: Request): Promise<IContentInfo[]> {
    try {
      const language =
        Language[req.query.language as Language] || Language.ENGLISH;

      const content = this.contentInfoService.getContentInfo(language);

      if (!content) throw new Error('Content not found');

      return content;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
