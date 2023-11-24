import { CallHandler, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface ResponsePattern<T> {
  ok: boolean;
  payload: T;
}

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, ResponsePattern<T>>
{
  intercept(_, next: CallHandler): Observable<ResponsePattern<T>> {
    return next.handle().pipe(map((data) => ({ ok: true, payload: data })));
  }
}
