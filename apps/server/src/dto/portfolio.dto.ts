import { Expose, Transform } from 'class-transformer';
import { IsString } from 'class-validator';

export class ProjectDto {
  @IsString()
  ID: string;

  @IsString()
  Title: string;

  @IsString()
  Description: string;

  @IsString()
  Image: string;

  @IsString()
  Demo: string;

  @IsString()
  Code: string;
}

export class ProjectResponseDto implements ProjectDto {
  @Expose()
  @Transform(({ value }) => value.rich_text[0].text.content)
  ID: string;

  @Expose()
  @Transform(({ value }) => value.url)
  Code: string;

  @Expose()
  @Transform(({ value }) => value.url)
  Demo: string;

  @Expose()
  @Transform(({ value }) => value.title[0].text.content)
  Title: string;

  @Expose()
  @Transform(({ value }) => value.url)
  Image: string;

  @Expose()
  @Transform(({ value }) => value.rich_text[0].text.content)
  Description: string;
}
