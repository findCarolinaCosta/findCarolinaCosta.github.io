import { HttpException } from '@nestjs/common';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { NextFunction, Request, Response } from 'express';

export class CorsConfig {
  static init = (req: Request, res: Response, next: NextFunction) => {
    const origin = req.headers.origin;

    const excludedRoutes = process.env.AUTH_ROUTES?.split(',') || [];

    const shouldExcludeCors = excludedRoutes.some(
      (route) => route == req.originalUrl.split('/')[1],
    );

    if (shouldExcludeCors) {
      return next();
    }

    const corsOrigin = this.cors().origin;

    if (typeof corsOrigin === 'function') {
      corsOrigin(origin, (err, allow) => {
        if (err) return next(err);

        if (allow) {
          res.setHeader('Access-Control-Allow-Origin', origin);
        }

        res.header(
          'Access-Control-Allow-Headers',
          'Origin, X-Requested-With, Content-Type, Accept',
        );

        next();
      });
    }
  };

  private static cors(): CorsOptions {
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
