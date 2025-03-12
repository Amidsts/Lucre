import { NextFunction, Response } from "express";
import { IToken, IRequest } from "../utils/types";
import jwt from "jsonwebtoken";
import appConfig from "../configs";
import { AuthenticationError, AuthorizationError } from "lucre-common"
import UserModel from "../models/user.model";

const validateToken = async (
  req: IRequest,
  _res: Response,
  next: NextFunction
) => {
  let token = req.headers.authorization as string;
  token = token?.replace("Bearer ", "");

  if (!token) return next(Error("Please provide an access token"));
  
  try {
    const decoded: IToken = jwt.verify(
      token,
      appConfig.accessTokenSecret
    ) as IToken;
    if (!decoded) throw new AuthenticationError("authentication is required");

    const { id } = decoded;
    const user = await UserModel.findById(id);
    if (!user) throw new AuthorizationError("authorization failed");

    req.user = user;
    next();
  } catch (err) {
    if (err.name) {
      if (err.name === "JsonWebTokenError") {
        return next(Error("invalid token"));
      } else if (err.name === "TokenExpiredError") {
        return next(Error("authentication expired. Please login again"));
      }
    }

    next(err);
  }
};

export default validateToken;
