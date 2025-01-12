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
const mongoose_1 = __importDefault(require("mongoose"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const app_1 = __importDefault(require("../configs/app"));
const helpers_1 = require("../utils/helpers");
const test_helpers_1 = require("../test/test-helpers");
const user_model_1 = __importDefault(require("../models/user.model"));
const { payload } = (0, test_helpers_1.userPayload)();
const objectId = new mongoose_1.default.Types.ObjectId();
it("should throw that no access token was provided", () => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield (0, supertest_1.default)(app_1.default).patch("/v1/auth/change-password").send({
        currentPassword: payload.password,
        newPassword: "abcdef12$",
        confirmPassword: "abcdef12$",
    });
    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Please provide an access token");
}));
it("should throw that token is invalid", () => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield (0, supertest_1.default)(app_1.default)
        .patch("/v1/auth/change-password")
        .set("authorization", `Bearer ${jsonwebtoken_1.default.sign(payload, "jw34x09hjfxd")}`)
        .send({
        currentPassword: payload.password,
        newPassword: "abcdef12$",
        confirmPassword: "abcdef12$",
    });
    expect(res.status).toBe(400);
    expect(res.body.message).toBe("invalid token");
}));
it("should throw for failed authourisation", () => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield (0, supertest_1.default)(app_1.default)
        .patch("/v1/auth/change-password")
        .set("authorization", `Bearer ${(0, helpers_1.generateToken)({ id: objectId.toString() })}`)
        .send({
        currentPassword: payload.password,
        newPassword: "abcdef12$",
        confirmPassword: "abcdef12$",
    });
    expect(res.status).toBe(403);
    expect(res.body.message).toBe("authorization failed");
}));
it("should throw that current password is not same as saved password", () => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.create(payload);
    const res = yield (0, supertest_1.default)(app_1.default)
        .patch("/v1/auth/change-password")
        .set("authorization", `Bearer ${(0, helpers_1.generateToken)({ id: user.id })}`)
        .send({
        currentPassword: "currentPassword",
        newPassword: "abcdef12$",
        confirmPassword: "abcdef12$",
    });
    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Incorrect password");
}));
it("should save password", () => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.create(payload);
    const res = yield (0, supertest_1.default)(app_1.default)
        .patch("/v1/auth/change-password")
        .set("authorization", `Bearer ${(0, helpers_1.generateToken)({ id: user.id })}`)
        .send({
        currentPassword: payload.password,
        newPassword: "abcdef12$",
        confirmPassword: "abcdef12$",
    });
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("password changed successfully");
}));
