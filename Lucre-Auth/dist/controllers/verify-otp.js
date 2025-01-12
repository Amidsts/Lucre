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
const request_wrapper_1 = require("../utils/request-wrapper");
const user_model_1 = __importDefault(require("../models/user.model"));
const error_1 = require("../utils/error");
const response_1 = require("../utils/response");
const redis_config_1 = require("../configs/persistent/redis/redis-config");
function verifyOtp(req, res, next) {
    const { email, otp } = req.body;
    return (0, request_wrapper_1.asyncWrapper)(() => __awaiter(this, void 0, void 0, function* () {
        let user = yield user_model_1.default.findOne({ email });
        if (!user)
            throw new error_1.ResourceNotFoundError("Account does not exist");
        const otpExist = yield (0, redis_config_1.GET)(`forgot-password:${otp}`);
        if (!otpExist)
            throw new error_1.BadRequestError("invalid OTP");
        yield (0, redis_config_1.setEx)(`verified:${otp}`, otp);
        return (0, response_1.responseHandler)({
            res,
            message: "verification successful",
        });
    }), next);
}
exports.default = verifyOtp;
