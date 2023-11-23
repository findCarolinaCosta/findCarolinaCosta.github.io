import { ApiProperty } from '@nestjs/swagger';

export class ContentInfoDto {
  @ApiProperty()
  role: string;

  @ApiProperty()
  homeDescription: string;

  @ApiProperty()
  aboutDescription: string;

  @ApiProperty()
  projects: number;

  @ApiProperty()
  homeImg: string;
}
