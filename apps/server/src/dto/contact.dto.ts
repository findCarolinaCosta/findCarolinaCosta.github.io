import { IsEmail, IsString, IsOptional } from 'class-validator';

export class ContactDTO {
  @IsString()
  @IsOptional()
  ID?: string;

  @IsString()
  Name: string;

  @IsString()
  Project: string;

  @IsString()
  Message: string;

  @IsEmail()
  Email: string;
}
