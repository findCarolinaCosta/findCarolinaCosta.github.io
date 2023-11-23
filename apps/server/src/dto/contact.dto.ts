import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsOptional } from 'class-validator';

export class ContactDto {
  @IsString()
  @IsOptional()
  @ApiProperty()
  ID?: string;

  @IsString()
  @ApiProperty()
  Name: string;

  @IsString()
  @ApiProperty()
  Project: string;

  @IsString()
  @ApiProperty()
  Message: string;

  @IsEmail()
  @ApiProperty()
  Email: string;
}
