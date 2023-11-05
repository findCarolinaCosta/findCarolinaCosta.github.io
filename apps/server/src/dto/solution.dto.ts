import { Transform } from 'class-transformer';

export class SolutionDto {
  @Transform(({ value }) => value.title[0].text.content)
  title: string;

  @Transform(({ value }) => value.select.name)
  tag?: string;

  solutionsList: string[];
}
