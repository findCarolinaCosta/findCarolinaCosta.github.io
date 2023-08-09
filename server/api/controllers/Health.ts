import { IMainInfoModel, IPortfolioModel, Language } from "./../models/IModel";
import { Client } from "@notionhq/client";
import { Response, Request, NextFunction } from "express";
import { success } from "../utils/apiResponse";
import { StatusCodes } from "http-status-codes";
import { MainInfo as MainInfoModel } from "./../models/MainInfo";

enum Connection {
  "CONNECTED" = "connected",
  "DISCONNECTED" = "disconnected",
}

export class Health {
  static check = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const language = Language["en-us"];
      const notion = new Client({
        auth: process.env.NOTION_PORTFOLIO_KEY,
      });
      const model = new MainInfoModel(
        notion,
        process.env.NOTION_MAIN_CONTENT_DATABASE_ID || ""
      );
      const checkConnectionTest = await model.read(language);

      return res.status(StatusCodes.OK).json(
        success({
          notionApi: !!checkConnectionTest
            ? Connection.CONNECTED
            : Connection.DISCONNECTED,
          documentation: process.env.DOC_URL,
          "portfolio-web": process.env.ORIGINS?.split(",")[0],
        })
      );
    } catch (error: unknown) {
      next(error);
    }
  };
}
