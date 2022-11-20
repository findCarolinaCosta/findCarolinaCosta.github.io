import { NextFunction, Request, Response } from "express";
import { IEmail } from "../models/IModel";

export class Gateway {
  constructor() {}

  public execute(req: Request, res: Response, next: NextFunction) {
    next();
  }

  public messageBody(req: Request, res: Response, next: NextFunction) {
    const body = req.body as unknown as IEmail;
    const emailRegex =
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi;

    if (!body) return res.status(400).json({ error: "body is required" });

    if (!body.Name) return res.status(400).json({ error: "Name is required" });

    if (!body.Email)
      return res.status(400).json({ error: "Email is required" });

    if (!emailRegex.test(body.Email))
      return res.status(400).json({ error: "Unsupported email format" });

    if (!body.Project)
      return res.status(400).json({ error: "Subject/Project is required" });

    if (!body.Message)
      return res.status(400).json({ error: "Message is required" });

    next();
  }
}
