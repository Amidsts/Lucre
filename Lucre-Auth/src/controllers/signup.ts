import { ConflictError } from "lucre-common";
import { NextFunction, Request, Response } from "express";
import { asyncWrapper } from "../utils/request-wrapper";
import UserModel from "../models/user.model";
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


  return asyncWrapper(
    async () => {
      let user = await UserModel.findOne({ email });
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
      }).save();

      /** IMPLEMENT KYC
       * 1) Document verification (options: passport, driver’s license, or national ID card.)
       * 2) Selfie verification
       * 3) Proof of Address ( using Documents like: utility bills or bank statements.
       */

      //create a user model in Wallet service

      //publish an onboarding event (this ensure the notification service is aware and send welcome email notification to the user)
      return responseHandler({
        res,
        data: user,
        message: "success",
        status: 201,
      });
    },
    next,
  );
}

export default signUp;
