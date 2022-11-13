import express from "express";
import cors from "cors";
import routes from "./routes";

class App {
  public app: express.Express;
  private _allowedOrigins: string[];

  constructor() {
    this.app = express();
    this.config();
    this.middlewares();
    this._allowedOrigins = process.env.ORIGINS?.split(",") || [];
  }

  private config(): void {
    this.app
      .use(
        cors({
          origin: this.origin,
        })
      )
      .use(express.json());
  }

  private middlewares(): void {
    // routes
    for (const route of routes) {
      this.app.use(route);
    }
  }

  private origin(origin: string | undefined, callback: any) {
    let msg =
      "The CORS policy for this site does not " +
      "allow access from the specified Origin.";

    if (!origin && process.env.DEVELOPMENT) return callback(null, true);

    if (!origin || !process.env.DEVELOPMENT) return callback(msg, true);

    if (this._allowedOrigins.indexOf(origin) === -1) {
      return callback(new Error(msg), false);
    }

    return callback(null, true);
  }

  public start(PORT: string | number): void {
    this.app.listen(PORT, () =>
      console.log(`Server is running on port: ${PORT}`)
    );
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
