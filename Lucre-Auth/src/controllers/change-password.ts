import { NextFunction, Response } from "express";
import { asyncWrapper } from "../utils/request-wrapper";
import UserModel from "../models/user.model";
import { BadRequestError } from "../utils/error";
import { responseHandler } from "../utils/response";
import { IRequest } from "../utils/types";

function changePassword(req: IRequest, res: Response, next: NextFunction) {
  const { newPassword, currentPassword } = req.body;
  const { _id } = req.user;
  return asyncWrapper(async () => {
    const user = await UserModel.findById(_id);
    if (!user) {
      return responseHandler({
        res,
        status: 404,
        message: "There was a problem at this time, pls wait some minutes",
      });
    }

    if (!user.comparePassword(currentPassword))
      throw new BadRequestError("Incorrect password");

    user.password = newPassword;
    await user.save();

    return responseHandler({ res, message: "password changed successfully" });
  }, next);
}

export default changePassword;
