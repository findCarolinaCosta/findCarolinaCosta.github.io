import { PropertiesCreateContactDto } from '../../dto/propertiesCreateContact.dto';
import { NotionPropertyCreateParameters } from '../../shared/services/notion/notion.type';

export interface IPropertiesCreateContactDto
  extends PropertiesCreateContactDto {}

export type PropertiesCreateContact = IPropertiesCreateContactDto &
  NotionPropertyCreateParameters;
