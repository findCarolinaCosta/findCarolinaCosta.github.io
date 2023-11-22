import {
  Controller,
  Get,
  HttpException,
  Injectable,
  Req,
} from '@nestjs/common';
import { Language } from '../../shared/constants/language.enum';
import { Request } from 'express';
import { SolutionDto } from '../../dto/solution.dto';
import { SolutionService } from './solution.service';
import { StatusCodes } from 'http-status-codes';

@Injectable()
@Controller('solutions')
export class SolutionController {
  constructor(private solutionService: SolutionService) {}

  @Get()
  async getSolutions(@Req() req: Request): Promise<SolutionDto[]> {
    try {
      const language =
        Language[req.query.language as Language] || Language.ENGLISH;

      const solutions = await this.solutionService.getSolutions(language);

      if (!solutions.length)
        throw new HttpException('Content not found', StatusCodes.NOT_FOUND);

      return solutions;
    } catch (error) {
      throw error;
    }
  }
}
