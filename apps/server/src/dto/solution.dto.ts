import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { Section } from './skill.dto';

export class SolutionDto {
  @ApiProperty()
  @Transform(({ value }) => value.title[0].text.content)
  title: string;

  @Transform(({ value }) => value.select.name)
  tag?: Section;

  @ApiProperty()
  solutionsList: string[];
}
