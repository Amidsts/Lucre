import { Response, Request } from "express";
import { ClientSession } from "mongoose";
import { IUser } from "../types/user.types";

export type handleResponseArgType = {
  res: Response;
  data?: any;
  status?: number;
  message?: string;
  session?: ClientSession;
};

export type IToken = {
  id: string;
};

export interface IRequest extends Request {
  user: IUser;
}
