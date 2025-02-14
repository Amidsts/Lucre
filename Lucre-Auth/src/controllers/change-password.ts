import { NextFunction, Response } from "express";
import { asyncWrapper } from "../utils/request-wrapper";
import { BadRequestError } from "../utils/error";
import { responseHandler } from "../utils/response";
import { IRequest } from "../utils/types";

function changePassword(req: IRequest, res: Response, next: NextFunction) {
  const { newPassword, currentPassword } = req.body;
  const { user } = req;
  return asyncWrapper(async () => {
    if (!user.comparePassword(currentPassword))
      throw new BadRequestError("Incorrect password");

    user.password = newPassword;
    await user.save();

    return responseHandler({ res, message: "password changed successfully" });
  }, next);
}

export default changePassword;
