import { NextFunction, Request, Response } from "express";
import { asyncWrapper } from "../utils/request-wrapper";
import UserModel from "../models/user.model";
import { BadRequestError } from "../utils/error";
import { responseHandler } from "../utils/response";
import { generateOtp } from "../utils/helpers";
import logger from "../configs/logger";

function sendOtp(req: Request, res: Response, next: NextFunction) {
  const { email } = req.body;

  return asyncWrapper(async () => {
    let user = await UserModel.findOne({ email });
    if (!user) throw new BadRequestError("an OTP was sent to your mail");

    const otp = generateOtp();
    //save to otp db <use redis>
    
    //publish forgot password event
    logger.info("otp", otp);

    return responseHandler({ res, message: "an OTP was sent to your mail" });
  }, next);
}

export default sendOtp;
