import { NextFunction, Request, Response } from "express";
import { asyncWrapper } from "../utils/request-wrapper";
import UserModel from "../models/user.model";
import { ConflictError } from "../utils/error";
import { generateAccountNumber } from "../utils/helpers";
import AccountModel from "../models/account.mode";
import { startSession } from "mongoose";
import { responseHandler } from "../utils/response";

async function signUp(req: Request, res: Response, next: NextFunction) {
  const {
    firstName,
    lastName,
    phoneNo,
    email,
    password,
    address,
    dateOfBirth,
  } = req.body;

  return asyncWrapper(async () => {
    const session = await startSession();
    session.startTransaction();

    let user = await UserModel.findOne({ email }).session(session);
    if (user) throw new ConflictError("Account already exists");

    user = await new UserModel({
      firstName,
      lastName,
      fullName: `${firstName} ${lastName}`,
      phoneNo,
      email,
      password,
      address,
      dateOfBirth,
    }).save({ session });

    /** IMPLEMENT KYC
     * 1) Document verification (options: passport, driver’s license, or national ID card.)
     * 2) Selfie verification
     * 3) Proof of Address ( using Documents like: utility bills or bank statements.
     */

    await new AccountModel({
      User: user.id,
      accountNo: generateAccountNumber(),
    }).save({ session });

    //publish an onboarding event (this ensure the notification service is aware and send welcome email notification to the user)
    return responseHandler({
      res,
      data: user,
      message: "success",
      status: 201,
      session,
    });
  }, next);
}

export default signUp;
