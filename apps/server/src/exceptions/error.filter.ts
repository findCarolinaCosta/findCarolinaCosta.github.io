import {
  Catch,
  ArgumentsHost,
  HttpException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { Response } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

@Catch()
export class ErrorHandlerFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const response: Response = host.switchToHttp().getResponse();
    let status: number = StatusCodes.INTERNAL_SERVER_ERROR;
    let message: string = ReasonPhrases.INTERNAL_SERVER_ERROR;
    let jsonReturn: any;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.message;
    }

    if (exception instanceof ServiceUnavailableException) {
      const errorResponse = exception.getResponse();

      jsonReturn = errorResponse;
    } else {
      jsonReturn = { ok: false, error: { status, message } };
    }

    response.status(status).json(jsonReturn);
  }
}
