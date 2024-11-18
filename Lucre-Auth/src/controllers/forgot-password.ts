import { NextFunction, Request, Response } from "express";
import { asyncWrapper } from "../utils/request-wrapper";
import UserModel from "../models/user.model";
import { BadRequestError } from "../utils/error";
import { responseHandler } from "../utils/response";
import { generateOtp } from "../utils/helpers";
import logger from "../configs/logger";
import { setEx } from "../configs/persistent/redis/redis-config";

function sendOtp(req: Request, res: Response, next: NextFunction) {
  const { email } = req.body;
  // logger.info(`connectRedis: ${connectRedis.Client}`);

  return asyncWrapper(async () => {
    let user = await UserModel.findOne({ email });
    if (!user) throw new BadRequestError("an OTP was sent to your mail");

    const otp = generateOtp();
    await setEx(`${user.id}:forgot-password`, otp);
    logger.info(`OTP---->   ${user.id}:forgot-password`);

    //publish forgot password event

    return responseHandler({
      res,
      message: "an OTP was sent to your mail",
    });
  }, next);
}

export default sendOtp;
