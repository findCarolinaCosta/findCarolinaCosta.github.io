import { Transform } from 'class-transformer';

enum Section {
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

export class SkillListDto implements ISkillList {
  @Transform(({ value }) => value.rich_text[0].text.content)
  ID?: string;

  @Transform(({ value }) => value.title[0].text.content)
  title: string;

  @Transform(({ value }) => value.rich_text[0].text.content)
  subtitle: string;

  @Transform(({ value }) => value.rich_text[0].text.content)
  unicons: string;

  @Transform(({ value }) => value.select.name)
  section: Section;

  skillsList: SkillDto[];
}

export class SkillDto implements ISkill {
  @Transform(({ value }) => value.title[0].text.content)
  name: string;

  @Transform(({ value }) => value.number)
  percentage: number;
}
