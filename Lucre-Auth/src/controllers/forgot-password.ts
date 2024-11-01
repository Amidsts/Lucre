import { NextFunction, Request, Response } from "express";
import { asyncWrapper } from "../utils/request-wrapper";
import UserModel from "../models/user.model";
import { BadRequestError } from "../utils/error";
import { responseHandler } from "../utils/response";

function forgotPassword(req: Request, res: Response, next: NextFunction) {
  const { email } = req.body;

  return asyncWrapper(async () => {
    let user = await UserModel.findOne({ email });
    if (!user) throw new BadRequestError("an OTP was sent to your mail");

    //publish forgot password event

    return responseHandler({ res, message: "an OTP was sent to your mail" });
  }, next);
}

export default forgotPassword;
