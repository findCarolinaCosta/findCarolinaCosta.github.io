import { SolutionDto } from '../../dto/solution.dto';
import { SolutionService } from './solution.service';
import { Controller, Get, Injectable, Req } from '@nestjs/common';
import { Language } from '../../shared/constants/language.enum';
import { Request } from 'express';

@Injectable()
@Controller('solutions')
export class SolutionController {
  constructor(private solutionService: SolutionService) {}

  @Get()
  async getSolutions(@Req() req: Request): Promise<SolutionDto[]> {
    try {
      const language =
        Language[req.query.language as Language] || Language.ENGLISH;

      return this.solutionService.getSolutions(language);
    } catch (error) {
      throw error;
    }
  }
}
