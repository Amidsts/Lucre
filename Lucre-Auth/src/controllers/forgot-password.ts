import { NextFunction, Request, Response } from "express";
import { asyncWrapper } from "../utils/request-wrapper";
import UserModel from "../models/user.model";
import { responseHandler } from "../utils/response";
import { generateOtp } from "../utils/helpers";
import {logger, errors} from "lucre-common";
import { setEx } from "../configs/persistent/redis/redis-config";

function sendOtp(req: Request, res: Response, next: NextFunction) {
  const { email } = req.body;

  return asyncWrapper(async () => {
    let user = await UserModel.findOne({ email });
    if (!user) throw new errors.BadRequestError("an OTP was sent to your mail");

    const otp = generateOtp();
    await setEx(`forgot-password:${otp}`, otp);

    //publish forgot password event

    return responseHandler({
      res,
      message: "an OTP was sent to your mail",
    });
  }, next);
}

export default sendOtp;
