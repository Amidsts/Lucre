import { Response, NextFunction } from "express";
import { ClientSession } from "mongoose";
import { ZodError } from "zod";

export async function asyncWrapper(
  callback: () => Promise<Response> | Response | any,
  next: NextFunction,
  session?: ClientSession,
) {
  try {
    const result = await callback();
    return result;
  } catch (err) {
    if (err instanceof ZodError) {
      console.log(err);
      next(Error(`${err.errors[0].path}: ${err.errors[0].message}`));
      return;
    }

    if (session) {
      await session.abortTransaction();
      await session.endSession();
    }
    return next(err);
  }
}
