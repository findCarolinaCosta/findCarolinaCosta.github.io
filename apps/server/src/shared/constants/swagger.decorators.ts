import { applyDecorators } from '@nestjs/common';
import { ApiProperty, ApiResponse, ApiResponseOptions } from '@nestjs/swagger';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

class ErrorResult {
  @ApiProperty()
  status: number;
  @ApiProperty()
  message: string;
}

export class ResponsePatternError {
  @ApiProperty({ default: false })
  ok: boolean;
  @ApiProperty({ type: ErrorResult })
  error: ErrorResult;
}

export function SwaggerResponsesDecorators(
  config?: ApiResponseOptions[],
  errorStatus?: StatusCodes[],
) {
  const decorators: (MethodDecorator & ClassDecorator)[] = [
    ApiResponse({
      status: StatusCodes.UNAUTHORIZED,
      description: ReasonPhrases.UNAUTHORIZED,
      type: ResponsePatternError,
    }),
    ApiResponse({
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      description: ReasonPhrases.INTERNAL_SERVER_ERROR,
      type: ResponsePatternError,
    }),
  ];

  if (errorStatus && errorStatus) {
    for (const status of errorStatus) {
      if (status < StatusCodes.BAD_REQUEST) continue;

      decorators.push(
        ApiResponse({
          status: status,
          description: ReasonPhrases[status],
          type: ResponsePatternError,
        }),
      );
    }
  }

  if (config) {
    for (const response of config) {
      decorators.push(ApiResponse(response));
    }
  }

  return applyDecorators(...decorators);
}
