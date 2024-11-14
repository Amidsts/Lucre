import request from "supertest";

import UserModel from "../models/user.model";
import app from "../configs/app";
import { userPayload } from "../test/test-helpers";
import * as helpers from "../utils/helpers";

it("should throw for a user that does not exist", async () => {
  const { payload } = userPayload();

  const res = await request(app).post("/v1/auth/signin").send({
    email: payload.email,
    password: payload.password,
    confirmPassword: payload.password,
  });

  expect(res.status).toBe(400);
  expect(res.body.message).toBe("Invalid credentials");
});

it("should throw for incorrect password", async () => {
  const { payload } = userPayload();
  await UserModel.create(payload);

  const res = await request(app).post("/v1/auth/signin").send({
    email: payload.email,
    password: "wrongpassword2#",
    confirmPassword: "wrongpassword2#",
  });

  expect(res.status).toBe(400);
  expect(res.body.message).toBe("Invalid credentials");
});

it("should login user and generate token", async () => {
  const { payload } = userPayload();
  await UserModel.create(payload);

  jest
    .spyOn(helpers, "generateToken")
    .mockReturnValue(
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMzk1ODcifQ.RnmTvkCiaCx7g93Uo1U6K7wEo5-huWM_A2juSJWBsfQ"
    );

  const res = await request(app).post("/v1/auth/signin").send({
    email: payload.email,
    password: payload.password,
    confirmPassword: payload.password,
  });

  expect(res.status).toBe(200);
  expect(res.body.message).toBe("Signin successful");
});
