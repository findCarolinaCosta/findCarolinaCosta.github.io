import { Request } from 'express';
import { QualificationService } from './qualification.service';
import {
  Controller,
  Get,
  HttpException,
  Injectable,
  Req,
} from '@nestjs/common';
import { QualificationDto } from '../../dto/qualification.dto';
import { Language } from '../../shared/constants/language.enum';
import { StatusCodes } from 'http-status-codes';

@Injectable()
@Controller('qualifications')
export class QualificationController {
  constructor(private readonly qualificationService: QualificationService) {}

  @Get()
  async getQualifications(@Req() req: Request): Promise<QualificationDto[]> {
    try {
      const language =
        Language[req.query.language as Language] || Language.ENGLISH;

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
