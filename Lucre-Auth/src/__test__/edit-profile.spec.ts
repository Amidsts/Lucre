import request from "supertest";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

import app from "../configs/app";
import { generateToken } from "../utils/helpers";
import { userPayload } from "../test/test-helpers";
import UserModel from "../models/user.model";

const { payload } = userPayload();
const objectId = new mongoose.Types.ObjectId();
const editProfilePayload = {
  firstName: "tests",
  lastName: "user",
  phoneNo: "+2349056778911",
  email: "laurem@email.com",
  address: "12, Aln str. GRA",
  dateOfBirth: "12-02-2009",
};

it("should throw that no access token was provided", async () => {
  const res = await request(app)
    .patch("/v1/auth/edit-profile")
    .send(editProfilePayload);

  expect(res.status).toBe(400);
  expect(res.body.message).toBe("Please provide an access token");
});

it("should throw that token is invalid", async () => {
  const res = await request(app)
    .patch("/v1/auth/edit-profile")
    .set("authorization", `Bearer ${jwt.sign(payload, "jw34x09hjfxd")}`)
    .send(editProfilePayload);

  expect(res.status).toBe(400);
  expect(res.body.message).toBe("invalid token");
});

it("should throw for failed authourisation", async () => {
  const res = await request(app)
    .patch("/v1/auth/edit-profile")
    .set(
      "authorization",
      `Bearer ${generateToken({ id: objectId.toString() })}`
    )
    .send(editProfilePayload);

  expect(res.status).toBe(403);
  expect(res.body.message).toBe("authorization failed");
});

it("should edit user profile", async () => {
  const user = await UserModel.create(payload);

  const res = await request(app)
    .patch("/v1/auth/edit-profile")
    .set("authorization", `Bearer ${generateToken({ id: user.id })}`)
    .send(editProfilePayload);

  expect(res.status).toBe(200);
  expect(res.body.message).toBe("profile update successful");
});
