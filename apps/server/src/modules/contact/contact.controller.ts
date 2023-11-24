import {
  Body,
  Controller,
  Injectable,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactDto } from '../../dto/contact.dto';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { SwaggerResponsesDecorators } from '../../shared/constants/swagger.decorators';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

class ContactResponse {
  @ApiProperty({ default: true })
  ok: boolean;
}

@Injectable()
@Controller('contact')
@ApiTags('Contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  @SwaggerResponsesDecorators(
    [
      {
        status: StatusCodes.CREATED,
        description: ReasonPhrases.CREATED,
        type: ContactResponse,
      },
    ],
    [StatusCodes.BAD_REQUEST],
  )
  async createContact(
    @Body(new ValidationPipe()) data: ContactDto,
  ): Promise<void> {
    try {
      await this.contactService.createContact(data);
    } catch (error) {
      throw error;
    }
  }
}
