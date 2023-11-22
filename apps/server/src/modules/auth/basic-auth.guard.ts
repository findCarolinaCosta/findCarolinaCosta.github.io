import { ExecutionContext, HttpException, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

@Injectable()
export class BasicAuthGuard extends AuthGuard('basic') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest(err: Error, user: any) {
    if (err || !user) {
      throw new HttpException(
        ReasonPhrases.UNAUTHORIZED,
        StatusCodes.UNAUTHORIZED,
      );
    }

    return user;
  }
}
