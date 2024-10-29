import { Response } from "express";
import { handleResponseArgType } from "./types";

export const responseHandler = ({
  res,
  data,
  message,
  status = 200,
  session,
}: handleResponseArgType): Response => {
  //   if (session) {
  //     await session.commitTransaction();
  //     session.endSession();
  //   }

  return res.status(status).json({
    message,
    data,
  });
};
