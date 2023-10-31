import { Transform } from 'class-transformer';

enum Tab {
  'EDUCATION' = 'Education',
  'WORK' = 'Work',
}

interface IQualification {
  title: string;
  subtitle: string;
  startYear: string;
  finalYear: string;
}

export interface QualificationDto {
  ID: string;
  tab: Tab;
  unicon: string;
  data: IQualification[];
}

export class QualificationsNotionResponseDto implements QualificationDto {
  @Transform(({ value }) => value.rich_text[0].text.content)
  ID: string;

  @Transform(({ value }) => value.title[0].text.content)
  tab: Tab;

  @Transform(({ value }) => value.rich_text[0].text.content)
  unicon: string;

  data: QualificationDataNotionResponseDto[];
}

export class QualificationDataNotionResponseDto implements IQualification {
  @Transform(({ value }) => value.title[0].text.content)
  title: string;

  @Transform(({ value }) => value.rich_text[0].text.content)
  subtitle: string;

  @Transform(({ value }) => value.rich_text[0].text.content)
  startYear: string;

  @Transform(({ value }) => value.rich_text[0].text.content)
  finalYear: string;
}
