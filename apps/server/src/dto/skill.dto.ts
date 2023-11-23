import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export enum Section {
  'FRONTEND' = 'frontend',
  'BACKEND' = 'backend',
}

export interface ISkill {
  name: string;
  percentage: number;
}

export interface ISkillList {
  ID?: string;
  title: string;
  subtitle: string;
  unicons: string;
  section: Section;
  skillsList: ISkill[];
}

export class SkillDto implements ISkill {
  @ApiProperty()
  @Transform(({ value }) => value.title[0].text.content)
  name: string;

  @ApiProperty()
  @Transform(({ value }) => value.number)
  percentage: number;
}

export class SkillListDto implements ISkillList {
  @ApiProperty()
  @Transform(({ value }) => value.rich_text[0].text.content)
  ID?: string;

  @ApiProperty()
  @Transform(({ value }) => value.title[0].text.content)
  title: string;

  @ApiProperty()
  @Transform(({ value }) => value.rich_text[0].text.content)
  subtitle: string;

  @ApiProperty()
  @Transform(({ value }) => value.rich_text[0].text.content)
  unicons: string;

  @ApiProperty()
  @Transform(({ value }) => value.select.name)
  section: Section;

  @ApiProperty({ type: [SkillDto] })
  skillsList: SkillDto[];
}
