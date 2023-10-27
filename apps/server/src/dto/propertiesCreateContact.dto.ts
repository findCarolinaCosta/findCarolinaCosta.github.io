import { Transform } from 'class-transformer';
import { ContactDTO } from './contact.dto';

export class PropertiesCreateContactDto
  extends ContactDTO
  implements ContactDTO
{
  @Transform(({ value }) => ({ title: [{ text: { content: value } }] }))
  ID: string;

  @Transform(({ value }) => ({ rich_text: [{ text: { content: value } }] }))
  Name: string;

  @Transform(({ value }) => ({ rich_text: [{ text: { content: value } }] }))
  Project: string;

  @Transform(({ value }) => ({ rich_text: [{ text: { content: value } }] }))
  Message: string;

  @Transform(({ value }) => ({ email: value }))
  Email: string;
}
