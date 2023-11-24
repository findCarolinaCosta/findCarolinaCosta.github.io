import {
  Controller,
  Get,
  HttpException,
  Injectable,
  Query,
} from '@nestjs/common';
import { Language } from '../../shared/constants/language.enum';
import { SkillListDto } from '../../dto/skill.dto';
import { SkillService } from './skill.service';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { ApiProperty, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ResponsePattern } from '../../interceptors/response.interceptor';
import { SwaggerResponsesDecorators } from '../../shared/constants/swagger.decorators';

class SkillsReponse implements ResponsePattern<SkillListDto[]> {
  @ApiProperty({ default: true })
  ok: boolean;
  @ApiProperty({ type: [SkillListDto] })
  payload: SkillListDto[];
}

@Injectable()
@Controller('skills')
@ApiTags('Skills')
export class SkillController {
  constructor(private readonly skillService: SkillService) {}

  @Get()
  @ApiQuery({ name: 'language', enum: Language })
  @SwaggerResponsesDecorators(
    [
      {
        status: StatusCodes.OK,
        description: ReasonPhrases.OK,
        type: SkillsReponse,
      },
    ],
    [StatusCodes.NOT_FOUND],
  )
  async getSkills(
    @Query('language') language: Language = Language['en-us'],
  ): Promise<SkillListDto[]> {
    try {
      const skills = await this.skillService.getSkills(language);

      if (!skills.length)
        throw new HttpException('Content not found', StatusCodes.NOT_FOUND);

      return skills;
    } catch (error) {
      throw error;
    }
  }
}
