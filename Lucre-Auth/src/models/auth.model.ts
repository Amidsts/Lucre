import { model, Schema } from "mongoose";
import bcrypt from "bcrypt";
import { IAuth } from "../types/auth.types";

const authSchema = new Schema<IAuth>(
  {
    firstName: String,
    lastName: String,
    fullName: String,
    phoneNo: String,
    email: String,
    password: String,
    address: String,
    dateOfBirth: String,
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (_doc, ret) {
        ret.id = ret._id;
        ret.version = ret.__v;
        delete ret._id;
        delete ret.__v;
        delete ret.password;
      },
    },
  }
);

authSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

authSchema.methods.comparePassword = async function (Password: string) {
  return await bcrypt.compare(Password, this.password);
};

const AuthModel = model<IAuth>("Auth", authSchema);
export default AuthModel;
