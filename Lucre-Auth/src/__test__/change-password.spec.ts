import request from "supertest";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

import app from "../configs/app";
import { generateToken } from "../utils/helpers";
import { userPayload } from "../test/test-helpers";
import UserModel from "../models/user.model";

const { payload } = userPayload();
const objectId = new mongoose.Types.ObjectId();

it(" should throw that no access token was provided", async () => {
  const res = await request(app).patch("/v1/auth/change-password").send({
    currentPassword: payload.password,
    newPassword: "abcdef12$",
    confirmPassword: "abcdef12$",
  });

  expect(res.status).toBe(400);
  expect(res.body.message).toBe("Please provide an access token");
});

it("should throw that token is invalid", async () => {
  const res = await request(app)
    .patch("/v1/auth/change-password")
    .set("authorization", `Bearer ${jwt.sign(payload, "jw34x09hjfxd")}`)
    .send({
      currentPassword: payload.password,
      newPassword: "abcdef12$",
      confirmPassword: "abcdef12$",
    });

  expect(res.status).toBe(400);
  expect(res.body.message).toBe("invalid token");
});

it("should throw for failed authourisation", async () => {
  const res = await request(app)
    .patch("/v1/auth/change-password")
    .set(
      "authorization",
      `Bearer ${generateToken({ id: objectId.toString() })}`
    )
    .send({
      currentPassword: payload.password,
      newPassword: "abcdef12$",
      confirmPassword: "abcdef12$",
    });

  expect(res.status).toBe(403);
  expect(res.body.message).toBe("authorization failed");
});

it("should throw that current password is not same as saved password", async () => {
  const user = await UserModel.create(payload);

  const res = await request(app)
    .patch("/v1/auth/change-password")
    .set("authorization", `Bearer ${generateToken({ id: user.id })}`)
    .send({
      currentPassword: "currentPassword",
      newPassword: "abcdef12$",
      confirmPassword: "abcdef12$",
    });

  expect(res.status).toBe(400);
  expect(res.body.message).toBe("Incorrect password");
});

it("should save password", async () => {
  const user = await UserModel.create(payload);

  const res = await request(app)
    .patch("/v1/auth/change-password")
    .set("authorization", `Bearer ${generateToken({ id: user.id })}`)
    .send({
      currentPassword: payload.password,
      newPassword: "abcdef12$",
      confirmPassword: "abcdef12$",
    });

  expect(res.status).toBe(200);
  expect(res.body.message).toBe("password changed successfully");
});
