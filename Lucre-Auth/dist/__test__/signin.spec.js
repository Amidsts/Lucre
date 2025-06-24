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
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
const user_model_1 = __importDefault(require("../models/user.model"));
const app_1 = __importDefault(require("../configs/app"));
const test_helpers_1 = require("../test/test-helpers");
const helpers = __importStar(require("../utils/helpers"));
it("should throw for a user that does not exist", () => __awaiter(void 0, void 0, void 0, function* () {
    const { payload } = (0, test_helpers_1.userPayload)();
    const res = yield (0, supertest_1.default)(app_1.default).post("/v1/auth/signin").send({
        email: payload.email,
        password: payload.password,
        confirmPassword: payload.password,
    });
    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Invalid credentials");
}));
it("should throw for incorrect password", () => __awaiter(void 0, void 0, void 0, function* () {
    const { payload } = (0, test_helpers_1.userPayload)();
    yield user_model_1.default.create(payload);
    const res = yield (0, supertest_1.default)(app_1.default).post("/v1/auth/signin").send({
        email: payload.email,
        password: "wrongpassword2#",
        confirmPassword: "wrongpassword2#",
    });
    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Invalid credentials");
}));
it("should login user and generate token", () => __awaiter(void 0, void 0, void 0, function* () {
    const { payload } = (0, test_helpers_1.userPayload)();
    yield user_model_1.default.create(payload);
    jest
        .spyOn(helpers, "generateToken")
        .mockReturnValue("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMzk1ODcifQ.RnmTvkCiaCx7g93Uo1U6K7wEo5-huWM_A2juSJWBsfQ");
    const res = yield (0, supertest_1.default)(app_1.default).post("/v1/auth/signin").send({
        email: payload.email,
        password: payload.password,
        confirmPassword: payload.password,
    });
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Signin successful");
}));
