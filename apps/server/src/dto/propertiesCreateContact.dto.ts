import { Transform } from 'class-transformer';
import { ContactDto } from './contact.dto';

export class PropertiesCreateContactDto
  extends ContactDto
  implements ContactDto
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
