import {
  Controller,
  Get,
  HttpException,
  Injectable,
  Req,
} from '@nestjs/common';
import { Language } from '../../shared/constants/language.enum';
import { Request } from 'express';
import { SkillListDto } from '../../dto/skill.dto';
import { SkillService } from './skill.service';
import { StatusCodes } from 'http-status-codes';

@Injectable()
@Controller('skills')
export class SkillController {
  constructor(private readonly skillService: SkillService) {}

  @Get()
  async getSkills(@Req() req: Request): Promise<SkillListDto[]> {
    try {
      const language =
        Language[req.query.language as Language] || Language.ENGLISH;

      const skills = await this.skillService.getSkills(language);

      if (!skills.length)
        throw new HttpException('Content not found', StatusCodes.NOT_FOUND);

      return skills;
    } catch (error) {
      throw error;
    }
  }
}
