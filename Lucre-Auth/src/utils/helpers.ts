import { randomBytes } from "crypto";
import jwt from "jsonwebtoken";

import appConfigs from "../configs";
import { IToken } from "./types";

const { accessTokenSecret, accessTokenLifeSpan } = appConfigs;

export function generateOtp() {
  return randomBytes(3).toString("hex");
}

export function generateAccountNumber() {
  return "ACC" + Math.floor(1000000000 + Math.random() * 9000000000);
}

export function generateToken(payload: IToken) {
  return jwt.sign(payload, accessTokenSecret, {
    expiresIn: accessTokenLifeSpan,
    issuer: "Lucre",
  });
}
