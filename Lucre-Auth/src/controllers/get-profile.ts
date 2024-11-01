import { NextFunction, Response } from "express";
import { asyncWrapper } from "../utils/request-wrapper";
import { responseHandler } from "../utils/response";
import { IRequest } from "../utils/types";

async function retriveProfile(
  req: IRequest,
  res: Response,
  next: NextFunction
) {
  const { user } = req;

  return asyncWrapper(async () => {
    return responseHandler({
      res,
      data: { userProfile: user },
    });
  }, next);
}

export default retriveProfile;
