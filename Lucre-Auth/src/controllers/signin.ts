import { NextFunction, Request, Response } from "express";
import { asyncWrapper } from "../utils/request-wrapper";
import UserModel from "../models/user.model";
import { errors} from "lucre-common"
import { generateToken } from "../utils/helpers";
import { responseHandler } from "../utils/response";

function signIn(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body;

  return asyncWrapper(async () => {
    let user = await UserModel.findOne({ email });
    if (!user) throw new errors.BadRequestError("Invalid credentials");

    if (!(user.comparePassword(password)))
      throw new errors.BadRequestError("Invalid credentials");

    const token = generateToken({ id: user.id });
    return responseHandler({
      res,
      message: "Signin successful",
      data: { token, user },
    });
  }, next);
}

export default signIn;
