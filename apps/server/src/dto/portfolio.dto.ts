import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';
import { IsString } from 'class-validator';

export class ProjectDto {
  @ApiProperty()
  @IsString()
  ID: string;

  @ApiProperty()
  @IsString()
  Title: string;

  @ApiProperty()
  @IsString()
  Description: string;

  @ApiProperty()
  @IsString()
  Image: string;

  @ApiProperty()
  @IsString()
  Demo: string;

  @ApiProperty()
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
