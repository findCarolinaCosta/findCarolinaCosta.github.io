import { Transform } from 'class-transformer';

export class SolutionListDto {
  @Transform(({ value }) => value.title[0].text.content)
  service: string;
}
