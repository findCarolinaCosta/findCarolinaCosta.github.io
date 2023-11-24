import {
  QualificationDataNotionResponseDto,
  QualificationDto,
  QualificationsDto,
  QualificationsNotionResponseDto,
  Tab,
} from '../../src/dto/qualification.dto';
import { NotionReadResult } from '../../src/shared/services/notion/notion.type';

export const QualificationDataSerialized: QualificationDto = {
  finalYear: 'finalYear',
  startYear: 'startYear',
  subtitle: 'subtitle',
  title: 'title',
};

export const QualificationSerialized: QualificationsDto = {
  data: [QualificationDataSerialized],
  ID: 'id',
  tab: Tab.WORK,
  unicon: 'unicon',
};

class QualificationsResponseNotionDefault extends QualificationsNotionResponseDto {
  constructor({ ID, data, tab, unicon }: QualificationsDto) {
    super();
    this.ID = ID;
    this.data = data;
    this.tab = tab;
    this.unicon = unicon;
  }

  toTransformedNotionDefault(): NotionReadResult<any> {
    return {
      results: [
        {
          properties: {
            ID: {
              rich_text: [
                {
                  text: {
                    content: this.ID,
                  },
                },
              ],
            },
            tab: {
              title: [
                {
                  text: {
                    content: this.tab,
                  },
                },
              ],
            },
            unicon: {
              rich_text: [
                {
                  text: {
                    content: this.unicon,
                  },
                },
              ],
            },
            data: this.data,
          },
        },
      ],
    };
  }
}

export const QualificationsResponseInstance =
  new QualificationsResponseNotionDefault(
    QualificationSerialized,
  ).toTransformedNotionDefault();

class QualificationResponseNotion extends QualificationDataNotionResponseDto {
  constructor({ finalYear, startYear, subtitle, title }: QualificationDto) {
    super();
    this.finalYear = finalYear;
    this.startYear = startYear;
    this.subtitle = subtitle;
    this.title = title;
  }

  toTransformedNotionDefault(): NotionReadResult<any> {
    return {
      results: [
        {
          properties: {
            finalYear: {
              rich_text: [
                {
                  text: {
                    content: this.finalYear,
                  },
                },
              ],
            },
            startYear: {
              rich_text: [
                {
                  text: {
                    content: this.startYear,
                  },
                },
              ],
            },
            subtitle: {
              rich_text: [
                {
                  text: {
                    content: this.subtitle,
                  },
                },
              ],
            },
            title: {
              title: [
                {
                  text: {
                    content: this.title,
                  },
                },
              ],
            },
          },
        },
      ],
    };
  }
}

export const QualificationResponseDataInstance =
  new QualificationResponseNotion(
    QualificationDataSerialized,
  ).toTransformedNotionDefault();
