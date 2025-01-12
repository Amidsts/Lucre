import request from "supertest";
import app from "../configs/app";
import { generateToken } from "../utils/helpers";
import { userPayload } from "../test/test-helpers";
import UserModel from "../models/user.model";
import * as redisConfig from "../configs/persistent/redis/redis-config";

const { payload } = userPayload();

it("should throw for non existing account", async () => {
  const res = await request(app).post("/v1/auth/verify-otp").send({
    email: "wrong@email.com",
    otp: "123456",
  });

  expect(res.status).toBe(404);
  expect(res.body.message).toBe("Account does not exist");
});

it("should throw for invalid otp", async () => {
  await UserModel.create(payload);

  const res = await request(app).post("/v1/auth/verify-otp").send({
    email: payload.email,
    otp: "123456",
  });

  expect(res.status).toBe(400);
  expect(res.body.message).toBe("invalid OTP");
});

it("should verify otp", async () => {
  await UserModel.create(payload);

  jest.spyOn(redisConfig, "GET").mockResolvedValue("123456");

  const res = await request(app).post("/v1/auth/verify-otp").send({
    email: payload.email,
    otp: "123456",
  });
    
  expect(res.status).toBe(200);
  expect(res.body.message).toBe("verification successful");
});
