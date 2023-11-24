import { AuthService } from './../shared/auth/auth.service';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpException, INestApplication } from '@nestjs/common';
import { Server as TServer } from 'http';
import { NextFunction, Request, Response } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

export class SwaggerConfig {
  public static init(app: INestApplication<TServer>): void {
    const config = new DocumentBuilder()
      .setTitle('Portfolio API')
      .setDescription('Portfolio API Documentation')
      .setVersion('1.0')
      .setLicense('MIT', 'https://opensource.org/licenses/MIT')
      .addServer(process.env.BASE_URL, 'Server')
      .addBasicAuth()
      .build();

    const document = SwaggerModule.createDocument(app, config);

    app.use(SwaggerConfig.docsBasicAuthMiddleware);

    SwaggerModule.setup('docs', app, document);
  }

  private static docsBasicAuthMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    if (!req.path.includes('/docs')) return next();

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Basic ')) {
      res.set('WWW-Authenticate', 'Basic realm="Secure Area", charset="UTF-8"');
      throw new HttpException(
        ReasonPhrases.UNAUTHORIZED,
        StatusCodes.UNAUTHORIZED,
      );
    }

    const base64Credentials = authHeader.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString(
      'ascii',
    );
    const [username, password] = credentials.split(':');

    const validateUser = new AuthService().validateUser;

    const isUserValid = validateUser(username, password);

    if (isUserValid) {
      return next();
    }

    res.set('WWW-Authenticate', 'Basic realm="Secure Area", charset="UTF-8"');
    throw new HttpException(
      ReasonPhrases.UNAUTHORIZED,
      StatusCodes.UNAUTHORIZED,
    );
  };
}
