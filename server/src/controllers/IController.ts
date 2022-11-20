import { QueryDatabaseResponse } from "@notionhq/client/build/src/api-endpoints";
import { Response, Request } from "express";

export interface IContactController {
  create: (req: Request, res: Response) => Promise<Response<void> | void>;
}
