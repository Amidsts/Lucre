import request from "supertest";
import app from "../configs/app";
import { userPayload } from "../test/test-helpers";
import UserModel from "../models/user.model";

import * as redisConfig from "../configs/persistent/redis/redis-config";

it("should throw that account does not exist", async () => {
  const res = await request(app).patch("/v1/auth/reset-password").send({
    email: "wrongMail@email.com",
    otp: "12345",
    newPassword: "abcdef12$",
    confirmPassword: "abcdef12$",
  });

  expect(res.status).toBe(404);
  expect(res.body.message).toBe("Account does not exist");
});

it("should throw if otp wasnt found", async () => {
  const { payload } = userPayload();
  await UserModel.create(payload);

  const res = await request(app).patch("/v1/auth/reset-password").send({
    email: payload.email,
    otp: "123456",
    newPassword: payload.password,
    confirmPassword: payload.password,
  });

  expect(res.status).toBe(400);
  expect(res.body.message).toBe("An Error occured");
});

it("should save new password and send a 200 status code", async () => {
  const otp = "123456";
  jest.spyOn(redisConfig, "GET").mockResolvedValue("123456");

  const { payload } = userPayload();
  await UserModel.create(payload);

  const res = await request(app).patch("/v1/auth/reset-password").send({
    email: payload.email,
    otp,
    newPassword: "New$password1",
    confirmPassword: "New$password1",
  });

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("password changed successfully");
});
