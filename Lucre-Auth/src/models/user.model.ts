import { model, Schema } from "mongoose";
import bcrypt from "bcrypt";
import { IUser } from "../types/user.types";

const userSchema = new Schema<IUser>(
  {
    firstName: String,
    lastName: String,
    fullName: String,
    phoneNo: String,
    email: String,
    password: String,
    address: String,
    dateOfBirth: String,
    kycVerified: Boolean,
  },
  {
    timestamps: true,
    toJSON: {
      transform(_doc, ret) {
        ret.id = ret._id;
        ret.version = ret.__v;
        delete ret._id;
        delete ret.__v;
        delete ret.password;
      },
    },
    toObject: {
      transform(_doc, ret) {
        ret.id = ret._id;
        ret.version = ret.__v;
        delete ret._id;
        delete ret.__v;
        delete ret.password;
      },
    },
  }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

userSchema.methods.comparePassword = function (Password: string) {  
  return bcrypt.compareSync(Password, this.password);
};

const UserModel = model<IUser>("User", userSchema);

export default UserModel;
