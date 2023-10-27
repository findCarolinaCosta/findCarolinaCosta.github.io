import {
  Body,
  Controller,
  Injectable,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactDTO } from 'src/dto/contact.dto';

@Injectable()
@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  async createContact(
    @Body(new ValidationPipe()) data: ContactDTO,
  ): Promise<void> {
    try {
      await this.contactService.createContact(data);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
