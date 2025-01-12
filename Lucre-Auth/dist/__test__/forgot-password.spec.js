"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const redis_1 = __importDefault(require("redis"));
const app_1 = __importDefault(require("../configs/app"));
const user_model_1 = __importDefault(require("../models/user.model"));
const test_helpers_1 = require("../test/test-helpers");
it("should throw for incorrect email", () => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield (0, supertest_1.default)(app_1.default)
        .post("/v1/auth/forgot-password")
        .send({ email: "testEmail@email.com" });
    expect(res.status).toBe(400);
    expect(res.body.message).toBe("an OTP was sent to your mail");
}));
it("should generate 6 digit otp, save to redis and send to the user", () => __awaiter(void 0, void 0, void 0, function* () {
    const { payload } = (0, test_helpers_1.userPayload)();
    yield user_model_1.default.create(payload);
    const res = yield (0, supertest_1.default)(app_1.default)
        .post("/v1/auth/forgot-password")
        .send({ email: payload.email });
    expect(res.headers["content-type"]).toMatch(/application\/json/);
    expect(res.status).toBe(200);
    expect(redis_1.default.createClient().setEx).toHaveBeenCalledTimes(1);
}));
