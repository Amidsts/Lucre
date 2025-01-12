"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const app_1 = __importDefault(require("../configs/app"));
const test_helpers_1 = require("../test/test-helpers");
const user_model_1 = __importDefault(require("../models/user.model"));
const redisConfig = __importStar(require("../configs/persistent/redis/redis-config"));
it("should throw that account does not exist", () => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield (0, supertest_1.default)(app_1.default).patch("/v1/auth/reset-password").send({
        email: "wrongMail@email.com",
        otp: "12345",
        newPassword: "abcdef12$",
        confirmPassword: "abcdef12$",
    });
    expect(res.status).toBe(404);
    expect(res.body.message).toBe("Account does not exist");
}));
it("should throw if otp wasnt found", () => __awaiter(void 0, void 0, void 0, function* () {
    const { payload } = (0, test_helpers_1.userPayload)();
    yield user_model_1.default.create(payload);
    const res = yield (0, supertest_1.default)(app_1.default).patch("/v1/auth/reset-password").send({
        email: payload.email,
        otp: "123456",
        newPassword: payload.password,
        confirmPassword: payload.password,
    });
    expect(res.status).toBe(400);
    expect(res.body.message).toBe("An Error occured");
}));
it("should save new password and send a 200 status code", () => __awaiter(void 0, void 0, void 0, function* () {
    const otp = "123456";
    jest.spyOn(redisConfig, "GET").mockResolvedValue("123456");
    const { payload } = (0, test_helpers_1.userPayload)();
    yield user_model_1.default.create(payload);
    const res = yield (0, supertest_1.default)(app_1.default).patch("/v1/auth/reset-password").send({
        email: payload.email,
        otp,
        newPassword: "New$password1",
        confirmPassword: "New$password1",
    });
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("password changed successfully");
}));
