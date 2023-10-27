import { Injectable } from '@nestjs/common';
import { NotionService } from 'src/shared/services/notion/notion.service';
import { PropertiesCreateContact } from './contact.type';
import { NotionDatabase } from 'src/shared/constants/notion.database';
import { v4 as uuidv4 } from 'uuid';
import { PropertiesCreateContactDto } from 'src/dto/propertiesCreateContact.dto';
import { plainToInstance } from 'class-transformer';
import { ContactDTO } from 'src/dto/contact.dto';

@Injectable()
export class ContactService {
  private readonly _databaseId: string =
    NotionDatabase.NOTION_PORTFOLIO_EMAILS_DATABASE_ID;

  constructor(private readonly notionService: NotionService) {}

  async createContact(data: ContactDTO): Promise<void> {
    const id = uuidv4();

    await this.notionService.create({
      databaseId: this._databaseId,
      data: this.serializeContact({ ...data, ID: id }),
    });
  }

  private serializeContact(data: ContactDTO): PropertiesCreateContact {
    return plainToInstance(
      PropertiesCreateContactDto,
      data,
    ) as PropertiesCreateContact;
  }
}
