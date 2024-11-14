import { model, Schema } from "mongoose";
import { IAccount } from "../types/account.types";

const accountSchema = new Schema<IAccount>(
  {
    User: { type: Schema.Types.ObjectId, ref: "User" },
    accountNo: { type: String, required: true, unique: true },
    balance: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const AccountModel = model<IAccount>("account", accountSchema);
export default AccountModel;
