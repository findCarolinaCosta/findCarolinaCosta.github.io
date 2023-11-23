import { HttpException, Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportStrategy } from '@nestjs/passport';
import { BasicStrategy as Strategy } from 'passport-http';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

@Injectable()
export class BasicStrategyService extends PassportStrategy(Strategy, 'basic') {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(username, password);

    if (!user)
      throw new HttpException(
        ReasonPhrases.UNAUTHORIZED,
        StatusCodes.UNAUTHORIZED,
      );

    return user;
  }
}
