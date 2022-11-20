import { NextFunction, Request, Response } from "express";

export class Gateway {
  constructor() {}

  public execute(req: Request, res: Response, next: NextFunction) {
    next();
  }
}
