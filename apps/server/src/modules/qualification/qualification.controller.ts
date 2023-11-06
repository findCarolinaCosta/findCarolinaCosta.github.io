import { Request } from 'express';
import { QualificationService } from './qualification.service';
import { Controller, Get, Injectable, Req } from '@nestjs/common';
import { QualificationDto } from 'dto/qualification.dto';
import { Language } from 'shared/constants/language.enum';

@Injectable()
@Controller('qualifications')
export class QualificationController {
  constructor(private readonly qualificationService: QualificationService) {}

  @Get()
  async getQualifications(@Req() req: Request): Promise<QualificationDto[]> {
    try {
      const language =
        Language[req.query.language as Language] || Language.ENGLISH;

      return this.qualificationService.getQualifications(language);
    } catch (error) {
      throw error;
    }
  }
}
