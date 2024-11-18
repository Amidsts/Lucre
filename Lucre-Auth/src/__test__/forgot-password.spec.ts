import request from "supertest";
import app from "../configs/app";
import UserModel from "../models/user.model";
import { userPayload } from "../test/test-helpers";
import logger from "../configs/logger";

it("should throw for incorrect email", async () => {
  const res = await request(app)
    .post("/v1/auth/forgot-password")
    .send({ email: "testEmail@email.com" });

  expect(res.status).toBe(400);
  expect(res.body.message).toBe("an OTP was sent to your mail");
});

it("should generate 6 digit otp, save to redis and send to the user", async () => {
  const { payload } = userPayload();
  await UserModel.create(payload);

  const res = await request(app)
    .post("/v1/auth/forgot-password")
    .send({ email: payload.email });

  logger.info(res.body)
   expect(res.headers["content-type"]).toMatch(/application\/json/);
  expect(res.status).toBe(200);
});
