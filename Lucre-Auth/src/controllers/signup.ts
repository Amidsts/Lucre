import { errors } from "lucre-common";
import { NextFunction, Request, Response } from "express";
import { asyncWrapper } from "../utils/request-wrapper";
import UserModel from "../models/user.model";
import { responseHandler } from "../utils/response";
import * as publisher from "../rmqManager";
import { IUser } from "../types/user.types";

async function signUp(req: Request, res: Response, next: NextFunction) {
  return asyncWrapper(async () => {
    let user = (await UserModel.findOne({ email: req.body.email })) as IUser;
    if (user) throw new errors.ConflictError("Account already exists");

    user = await saveNewUser(req.body);
    const {
      _id,
      firstName,
      lastName,
      fullName,
      phoneNo,
      email,
      address,
      dateOfBirth,
    } = user;

    //IMPLEMENT KYC

    await publisher.createNewUser({
      id: String(_id),
      firstName,
      lastName,
      fullName,
      phoneNo,
      email,
      address,
      dateOfBirth,
    });

    return responseHandler({
      res,
      data: user,
      message: "success",
      status: 201,
    });
  }, next);
}

async function saveNewUser(params: IUser): Promise<IUser> {
  const { firstName, lastName } = params;

  return new UserModel({
    ...params,
    fullName: `${firstName} ${lastName}`,
  }).save();
}

export default signUp;
