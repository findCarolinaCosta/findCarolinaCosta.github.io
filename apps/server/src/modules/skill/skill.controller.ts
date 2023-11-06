import { Language } from '../../shared/constants/language.enum';
import { SkillService } from './skill.service';
import { Controller, Get, Injectable, Req } from '@nestjs/common';
import { Request } from 'express';
import { SkillListDto } from '../../dto/skill.dto';

@Injectable()
@Controller('skills')
export class SkillController {
  constructor(private readonly skillService: SkillService) {}

  @Get()
  async getSkills(@Req() req: Request): Promise<SkillListDto[]> {
    try {
      const language =
        Language[req.query.language as Language] || Language.ENGLISH;

      return this.skillService.getSkills(language);
    } catch (error) {
      throw error;
    }
  }
}
