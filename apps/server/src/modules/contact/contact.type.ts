import { PropertiesCreateContactDto } from '../../dto/propertiesCreateContact.dto';
import { NotionPropertyCreateParameters } from '../../shared/services/notion/notion.type';

export interface IPropertiesCreateContactDTO
  extends PropertiesCreateContactDto {}

export type PropertiesCreateContact = IPropertiesCreateContactDTO &
  NotionPropertyCreateParameters;
