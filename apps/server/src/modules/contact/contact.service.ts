import { Injectable } from '@nestjs/common';
import { NotionService } from '../../shared/services/notion/notion.service';
import { PropertiesCreateContact } from './contact.type';
import { v4 as uuidv4 } from 'uuid';
import { PropertiesCreateContactDto } from '../../dto/propertiesCreateContact.dto';
import { plainToInstance } from 'class-transformer';
import { ContactDto } from '../../dto/contact.dto';

@Injectable()
export class ContactService {
  private readonly _databaseId: string =
    process.env.NOTION_PORTFOLIO_EMAILS_DATABASE_ID;

  constructor(private readonly notionService: NotionService) {}

  async createContact(data: ContactDto): Promise<void> {
    const id = uuidv4();

    await this.notionService.create({
      databaseId: this._databaseId,
      data: this.serializeContact({ ...data, ID: id }),
    });
  }

  private serializeContact(data: ContactDto): PropertiesCreateContact {
    return plainToInstance(
      PropertiesCreateContactDto,
      data,
    ) as PropertiesCreateContact;
  }
}
