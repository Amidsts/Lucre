import { Document } from "mongoose";

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  fullName: string;
  phoneNo: string;
  email: string;
  password: string;
  address: string;
  dateOfBirth: string;
  kycVerified: boolean;
  comparePassword?: (password: string) => Promise<boolean>;
}
