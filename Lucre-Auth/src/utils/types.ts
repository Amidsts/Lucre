import { Response } from "express";
import { ClientSession } from "mongoose";

export type handleResponseArgType = {
  res: Response;
  data?: any;
  status?: number;
  message?: string;
  session?: ClientSession;
};
