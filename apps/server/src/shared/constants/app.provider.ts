import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { ErrorHandlerFilter } from '../../exceptions/error.filter';
import { ResponseInterceptor } from '../../interceptors/response.interceptor';

export const AppProviders = [
  {
    provide: APP_INTERCEPTOR,
    useClass: ResponseInterceptor,
  },
  {
    provide: APP_FILTER,
    useClass: ErrorHandlerFilter,
  },
];
