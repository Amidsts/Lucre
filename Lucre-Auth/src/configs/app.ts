import express, { Application, NextFunction, Response, Request } from "express";
import cors from "cors";
import helmet from "helmet";

import { responseHandler } from "../utils/response";
import UserRouter from "../routes";

const app: Application = express();
const initializeMiddleware = () => {
  app
    .use(cors())
    .use(express.json({ limit: "50kb" }))
    .use(express.urlencoded({ limit: "50kb", extended: false }))
    .use(helmet())
    .use((err: any, req: Request, res: Response, next: NextFunction) => {
      if (req.method === "OPTIONS") {
        res.header(
          "Access-Control-Allow-Methods",
          "POST, PUT, PATCH, GET, DELETE"
        );
        return next(Error("Invalid header method"));
      }

      if (req.body && err instanceof SyntaxError) {
        return next("Malformed JSON, please check the body of your request");
      }

      return next();
    });
};

const initializeRoute = () => {

  app.get("/", (req: Request, res: Response) => {
    responseHandler({ res, message: "Welcome to Lucre, Lets get started!" });
  });

  app.use("/v1/auth", UserRouter);
  
  app.all("*", (_req, res: Response) => {
    responseHandler({
      res,
      status: 404,
      message: "You have used an invalid method or hit an invalid route",
    });
  });

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    responseHandler({
      res,
      message: err.message,
      status: err.statusCode || 400,
    });
  });
};

initializeMiddleware();
initializeRoute();

export default app;
