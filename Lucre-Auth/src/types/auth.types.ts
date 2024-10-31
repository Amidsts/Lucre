import { Document } from "mongoose";

export interface IAuth extends Document {
  firstName: string;
  lastName: string;
  fullName: string;
  phoneNo: string;
  email: string;
  password: string;
  address: string;
  dateOfBirth: string;
}
