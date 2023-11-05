import { HttpException } from '@nestjs/common';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

export class CorsConfig {
  static init(): CorsOptions {
    return {
      origin: (origin, callback) => {
        const allowedOrigins = process.env.ORIGINS?.split(',') || [];
        const isDevelopmentEnvironment =
          !origin && process.env.NODE_ENV == 'development';

        if (isDevelopmentEnvironment) return callback(null, true);

        const requiresAuthorization =
          origin && !allowedOrigins.includes(origin);

        const isUnauthorized =
          requiresAuthorization || (!origin && !isDevelopmentEnvironment);

        if (isUnauthorized) {
          throw new HttpException(
            ReasonPhrases.UNAUTHORIZED,
            StatusCodes.UNAUTHORIZED,
          );
        }

        return callback(null, true);
      },
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    };
  }
}
