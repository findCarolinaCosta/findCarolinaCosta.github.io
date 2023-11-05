import { Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Response } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

@Catch()
export class ErrorHandlerFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const response: Response = host.switchToHttp().getResponse();
    let status: number = StatusCodes.INTERNAL_SERVER_ERROR;
    let message: string = ReasonPhrases.INTERNAL_SERVER_ERROR;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.message;
    }

    response.status(status).json({ ok: false, error: { status, message } });
  }
}
