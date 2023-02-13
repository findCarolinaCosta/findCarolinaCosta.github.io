import { NextFunction, Request, Response } from "express";
import { failure } from "../utils/apiResponse";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

export class ErrorGenerate extends Error {
  constructor(readonly status: StatusCodes, readonly message: ReasonPhrases) {
    super(message);

    this.status = status;
  }
}

class errorHandler {
  public execute = (
    error: {
      status: StatusCodes;
      message: ReasonPhrases;
    },
    _req: Request,
    res: Response,
    _next: NextFunction
  ) => {
    const isKnownError = Object.values(ReasonPhrases).includes(error.message);

    return res
      .status(
        error.status && isKnownError
          ? error.status
          : StatusCodes.INTERNAL_SERVER_ERROR
      )
      .send(
        failure(
          error.status && isKnownError
            ? error.message
            : ReasonPhrases.INTERNAL_SERVER_ERROR
        )
      );
  };
}

export default new errorHandler();
