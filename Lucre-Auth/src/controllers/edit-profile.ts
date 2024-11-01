import { NextFunction, Response } from "express";
import { asyncWrapper } from "../utils/request-wrapper";
import { responseHandler } from "../utils/response";
import { IRequest } from "../utils/types";

async function editProfile(req: IRequest, res: Response, next: NextFunction) {
  const { firstName, lastName, phoneNo, email, address, dateOfBirth } =
    req.body;
  const { user } = req;

  return asyncWrapper(async () => {
    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.fullName = `${firstName} ${lastName}`;
    user.phoneNo = phoneNo;
    user.address = address;
    user.dateOfBirth = dateOfBirth;
    await user.save();

    return responseHandler({
      res,
      data: user,
      message: "profile update successful",
    });
  }, next);
}

export default editProfile;
