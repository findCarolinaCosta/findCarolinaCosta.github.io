import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { ErrorHandlerFilter } from '../../exceptions/error.filter';
import { ResponseInterceptor } from '../../interceptors/response.interceptor';
import { Logger } from '@nestjs/common';
import { EmptyLogger } from './EmptyLogger.service';

export const AppProviders = [
  {
    provide: APP_INTERCEPTOR,
    useClass: ResponseInterceptor,
  },
  {
    provide: APP_FILTER,
    useClass: ErrorHandlerFilter,
  },
  {
    provide: Logger,
    useClass: process.env.NODE_ENV === 'test' ? EmptyLogger : Logger,
  },
];
