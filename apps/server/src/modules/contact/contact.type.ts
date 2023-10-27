import { PropertiesCreateContactDto } from 'src/dto/propertiesCreateContact.dto';
import { NotionPropertyCreateParameters } from 'src/shared/services/notion/notion.type';

export interface IPropertiesCreateContactDTO
  extends PropertiesCreateContactDto {}

export type PropertiesCreateContact = IPropertiesCreateContactDTO &
  NotionPropertyCreateParameters;
