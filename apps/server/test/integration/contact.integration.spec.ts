import { AppProviders } from '../../src/shared/constants/app.provider';
import { ContactDto } from '../../src/dto/contact.dto';
import { ContactModule } from '../../src/modules/contact/contact.module';
import { ContactService } from '../../src/modules/contact/contact.service';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import MockNotionServiceMock from '../mock/MockNotionService.mock';

describe('Contact me endpoint (Integration)', () => {
  let app: INestApplication;
  const MockContactService = new ContactService(MockNotionServiceMock);
  let contactDTO: ContactDto;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [ContactModule],
      providers: AppProviders,
    })
      .overrideProvider(ContactService)
      .useValue(MockContactService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it('Success in contacting', () => {
    contactDTO = {
      Email: 'test@email.com',
      Message: 'Subject',
      Name: 'Name Surname',
      Project: 'Project Name',
    };

    return request(app.getHttpServer())
      .post('/contact')
      .send(contactDTO)
      .set('Accept', 'application/json')
      .expect(201);
  });

  it('Fail in contacting if pass invalid email', () => {
    contactDTO = {
      Email: 'test',
      Message: 'Subject',
      Name: 'Name Surname',
      Project: 'Project Name',
    };

    return request(app.getHttpServer())
      .post('/contact')
      .send(contactDTO)
      .set('Accept', 'application/json')
      .expect(400)
      .expect('Content-Type', /json/)
      .expect({
        ok: false,
        error: { status: 400, message: 'Bad Request Exception' },
      });
  });

  it('Should return error if Notion service fails', () => {
    const error = new Error('Notion service error');
    jest.spyOn(MockNotionServiceMock, 'create').mockImplementationOnce(() => {
      throw error;
    });

    contactDTO = {
      Email: 'test@email.com',
      Message: 'Subject',
      Name: 'Name Surname',
      Project: 'Project Name',
    };

    return request(app.getHttpServer())
      .post('/contact')
      .send(contactDTO)
      .set('Accept', 'application/json')
      .expect(500)
      .expect('Content-Type', /json/)
      .expect({
        ok: false,
        error: { status: 500, message: 'Internal Server Error' },
      });
  });
});
