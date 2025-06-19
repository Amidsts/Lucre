import { NextFunction, Request, Response } from "express";
import { asyncWrapper } from "../utils/request-wrapper";
import UserModel from "../models/user.model";
import { errors } from "lucre-common"
import { responseHandler } from "../utils/response";
import { GET, setEx } from "../configs/persistent/redis/redis-config";

function verifyOtp(req: Request, res: Response, next: NextFunction) {
  const { email, otp } = req.body;

  return asyncWrapper(async () => {
    let user = await UserModel.findOne({ email });
    if (!user) throw new errors.ResourceNotFoundError("Account does not exist");

    const otpExist = await GET(`forgot-password:${otp}`);
    if (!otpExist) throw new errors.BadRequestError("invalid OTP");

    await setEx(`verified:${otp}`, otp);

    return responseHandler({
      res,
      message: "verification successful",
    });
  }, next);
}

export default verifyOtp;
