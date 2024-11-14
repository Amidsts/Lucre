import request from "supertest";
import * as helpersModule from "../utils/helpers";

import app from "../configs/app";
import UserModel from "../models/user.model";
import { session } from "../test/setup";
import AccountModel from "../models/account.mode";
import { userPayload } from "../test/test-helpers";

it("should throw an error that account already exists", async () => {
  const { payload } = userPayload();
  await new UserModel(payload).save();

  const res = await request(app).post("/v1/auth/signup").send(payload);
  expect(res.status).toBe(409);
  expect(session.abortTransaction).toHaveBeenCalledTimes(1);
  expect(session.endSession).toHaveBeenCalledTimes(1);
});

it("should save user and account to the database, call generateAccountNumber, then commit transaction", async () => {
  const { payload } = userPayload();

  jest.spyOn(helpersModule, "generateAccountNumber");
  UserModel.prototype.save = jest.fn().mockResolvedValue(payload);
  AccountModel.prototype.save = jest.fn();

  const res = await request(app).post("/v1/auth/signup").send(payload);

  UserModel.prototype.save();
  expect(res.status).toBe(201);
  expect(session.commitTransaction).toHaveBeenCalledTimes(1);
  expect(session.endSession).toHaveBeenCalledTimes(1);
});
