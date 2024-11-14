import { NextFunction, Request, Response } from "express";
import { Schema } from "zod";

import { asyncWrapper } from "../utils/request-wrapper"

const validateInput =
  (schema: Schema, fieldType: "body" | "params" | "query" = "body") =>
  (req: Request, res: Response, next: NextFunction) => {
    return asyncWrapper(
      async () => {
        let parsedData;
        if (fieldType === "body") {
          parsedData = schema.parse(req.body);
          req.body = parsedData;
        } else if (fieldType === "params") {
          parsedData = schema.parse(req.params);
          req.params = parsedData;
        } else if (fieldType === "query") {
          parsedData = schema.parse(req.query);
          req.query = parsedData;
        }

        next();
      },
      next
    );
  };

export default validateInput;
