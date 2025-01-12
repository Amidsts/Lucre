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
const helpersModule = __importStar(require("../utils/helpers"));
const app_1 = __importDefault(require("../configs/app"));
const user_model_1 = __importDefault(require("../models/user.model"));
const setup_1 = require("../test/setup");
const account_mode_1 = __importDefault(require("../models/account.mode"));
const test_helpers_1 = require("../test/test-helpers");
it("should throw an error that account already exists", () => __awaiter(void 0, void 0, void 0, function* () {
    const { payload } = (0, test_helpers_1.userPayload)();
    yield new user_model_1.default(payload).save();
    const res = yield (0, supertest_1.default)(app_1.default).post("/v1/auth/signup").send(payload);
    expect(res.status).toBe(409);
    expect(setup_1.session.abortTransaction).toHaveBeenCalledTimes(1);
    expect(setup_1.session.endSession).toHaveBeenCalledTimes(1);
}));
it("should save user and account to the database, call generateAccountNumber, then commit transaction", () => __awaiter(void 0, void 0, void 0, function* () {
    const { payload } = (0, test_helpers_1.userPayload)();
    jest.spyOn(helpersModule, "generateAccountNumber");
    user_model_1.default.prototype.save = jest.fn().mockResolvedValue({
        firstName: "John",
        lastName: "laurem",
        phoneNo: "+2349056778912",
        email: "laurem@email.com",
        address: "12, Aln str. GRA",
        dateOfBirth: "12-02-2009",
    });
    account_mode_1.default.prototype.save = jest.fn();
    const res = yield (0, supertest_1.default)(app_1.default).post("/v1/auth/signup").send(payload);
    // logger.info("new user", res.body);
    user_model_1.default.prototype.save();
    expect(res.status).toBe(201);
    expect(setup_1.session.commitTransaction).toHaveBeenCalledTimes(1);
    expect(setup_1.session.endSession).toHaveBeenCalledTimes(1);
}));
