import { Document } from "mongoose";
import { IUser } from "./user.types";

export interface IAccount extends Document {
  User: IUser;
  accountNo: string;
  balance: number;
}
