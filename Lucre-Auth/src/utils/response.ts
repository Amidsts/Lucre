import { Response } from "express";
import { handleResponseArgType } from "./types";

export const responseHandler = async ({
  res,
  data,
  message,
  status = 200,
  session,
}: handleResponseArgType): Promise<Response> => {
  if (session) {
    await session.commitTransaction();
    session.endSession();
  }

  return res.status(status).json({
    message,
    data,
  });
};
