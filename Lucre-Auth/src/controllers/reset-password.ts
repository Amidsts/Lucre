import { NextFunction, Request, Response } from "express";
import { asyncWrapper } from "../utils/request-wrapper";
import UserModel from "../models/user.model";
import { errors } from "lucre-common"
import { responseHandler } from "../utils/response";
import { GET } from "../configs/persistent/redis/redis-config";

function resetPassword(req: Request, res: Response, next: NextFunction) {
  const { email, otp, newPassword } = req.body;

  return asyncWrapper(async () => {
    let user = await UserModel.findOne({ email });
    if (!user) throw new errors.ResourceNotFoundError("Account does not exist");

    const otpVerified = await GET(`verified:${otp}`);
    if (!otpVerified) throw new errors.BadRequestError("An Error occured");

    user.password = newPassword;
    await user.save();

    return responseHandler({
      res,
      message: "password changed successfully",
    });
  }, next);
}

export default resetPassword;
