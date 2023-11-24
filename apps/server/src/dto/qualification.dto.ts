import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export enum Tab {
  'EDUCATION' = 'Education',
  'WORK' = 'Work',
}

export class QualificationDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  subtitle: string;

  @ApiProperty()
  startYear: string;

  @ApiProperty()
  finalYear: string;
}

export class QualificationsDto {
  @ApiProperty()
  ID: string;

  @ApiProperty({ enum: Tab })
  tab: Tab;

  @ApiProperty()
  unicon: string;

  @ApiProperty({ type: [QualificationDto] })
  data: QualificationDto[];
}

export class QualificationsNotionResponseDto implements QualificationsDto {
  @Transform(({ value }) => value.rich_text[0].text.content)
  ID: string;

  @Transform(({ value }) => value.title[0].text.content)
  tab: Tab;

  @Transform(({ value }) => value.rich_text[0].text.content)
  unicon: string;

  data: QualificationDataNotionResponseDto[];
}

export class QualificationDataNotionResponseDto implements QualificationDto {
  @Transform(({ value }) => value.title[0].text.content)
  title: string;

  @Transform(({ value }) => value.rich_text[0].text.content)
  subtitle: string;

  @Transform(({ value }) => value.rich_text[0].text.content)
  startYear: string;

  @Transform(({ value }) => value.rich_text[0].text.content)
  finalYear: string;
}
