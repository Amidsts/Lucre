import { Document } from "mongoose";
import { IUser } from "./user.types";
import { currencyEnum } from "./enums/currency-enum";

export interface IAccount extends Document {
  User: IUser;
  accountNo: string;
  balance: number;
  currency: currencyEnum
}
