import { model, Schema } from "mongoose";
import { IAccount } from "../types/account.types";
import { currencyEnum } from "../types/enums/currency-enum";

const accountSchema = new Schema<IAccount>(
  {
    User: { type: Schema.Types.ObjectId, ref: "User" },
    accountNo: { type: String, required: true, unique: true },
    balance: { type: Number, default: 0 },
    currency: { type: String, enum: currencyEnum },
  },
  { timestamps: true }
);

const AccountModel = model<IAccount>("account", accountSchema);
export default AccountModel;
