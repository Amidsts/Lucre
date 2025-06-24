import { Document, Types } from "mongoose";

export interface IUser extends Document {
  _id: Types.ObjectId;
  firstName: string;
  lastName: string;
  fullName: string;
  phoneNo: string;
  email: string;
  password: string;
  address: string;
  dateOfBirth: string;
  kycVerified: boolean;
  comparePassword: (password: string) => boolean;
}

export type UserDate = Pick<
  IUser,
  | "firstName"
  | "lastName"
  | "fullName"
  | "phoneNo"
  | "email"
  | "password"
  | "address"
  | "dateOfBirth"
  | "kycVerified"
>;
// export interface UserData {
//   firstName: string;
//   lastName: string;
//   fullName: string;
//   phoneNo: string;
//   email: string;
//   address: string;
//   dateOfBirth: string;
// }
