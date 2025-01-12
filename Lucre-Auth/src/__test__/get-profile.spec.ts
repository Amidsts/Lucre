import request from "supertest";
import app from "../configs/app";
import mongoose from "mongoose";
import { generateToken } from "../utils/helpers";
import UserModel from "../models/user.model";
import { userPayload } from "../test/test-helpers";

it("should retrive user's profile", async () => {
  const { payload } = userPayload();
  const user = await UserModel.create(payload);

  const res = await request(app)
    .get("/v1/auth/profile")
    .set("authorization", `Bearer ${generateToken({ id: user.id })}`)
    .send();

  expect(res.status).toBe(200);
});
