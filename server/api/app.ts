import express from "express";
import cors from "cors";
import routes from "./routes";
import morgan from "morgan";
import errorHandler, { ErrorGenerate } from "./middlewares/errorHandler";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { redis } from "./services/redis";

class App {
  public app: express.Express;
  public errorHandler = errorHandler;

  constructor() {
    this.app = express();
    this.config();
    this.middlewares();
  }

  private config(): void {
    this.app
      .use(
        cors({
          origin: this.origin,
        })
      )
      .use(express.json());
    this.morganConfig();
  }

  private middlewares(): void {
    // routes
    this.app.get("/", (_, res) =>
      res.redirect(process.env.ORIGINS?.split(",")[0] || "")
    );
    for (const route of routes) {
      this.app.use(route);
    }
    this.app.use(this.errorHandler.execute);
  }

  private origin(origin: string | undefined, callback: any) {
    const allowedOrigins = process.env.ORIGINS?.split(",") || [];

    if (!origin && !!process.env.NODE_ENV) return callback(null, true);

    if (origin && !allowedOrigins.includes(origin)) {
      return callback(
        new ErrorGenerate(StatusCodes.UNAUTHORIZED, ReasonPhrases.UNAUTHORIZED),
        false
      );
    }

    if (!origin && !process.env.NODE_ENV) {
      return callback(
        new ErrorGenerate(StatusCodes.UNAUTHORIZED, ReasonPhrases.UNAUTHORIZED),
        false
      );
    }

    return callback(null, true);
  }

  public start(PORT: string | number): void {
    this.app.listen(PORT, () =>
      console.log(`Server is running on port: ${PORT}`)
    );
  }

  private morganConfig() {
    this.app.use(
      morgan("tiny", {
        skip: function (_req, res) {
          return res.statusCode < 400;
        },
      })
    );
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();

// When server is closed
process.on("exit", () => {
  // Close redis connection
  redis.quit();
});
