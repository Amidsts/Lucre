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
const helpers_1 = require("../utils/helpers");
const account_mode_1 = __importDefault(require("../models/account.mode"));
const mongoose_1 = require("mongoose");
const response_1 = require("../utils/response");
function signUp(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { firstName, lastName, phoneNo, email, password, address, dateOfBirth, } = req.body;
        const session = yield (0, mongoose_1.startSession)();
        session.startTransaction();
        return (0, request_wrapper_1.asyncWrapper)(() => __awaiter(this, void 0, void 0, function* () {
            let user = yield user_model_1.default.findOne({ email });
            if (user)
                throw new error_1.ConflictError("Account already exists");
            user = yield new user_model_1.default({
                firstName,
                lastName,
                fullName: `${firstName} ${lastName}`,
                phoneNo,
                email,
                password,
                address,
                dateOfBirth,
            }).save({ session });
            /** IMPLEMENT KYC
             * 1) Document verification (options: passport, driver’s license, or national ID card.)
             * 2) Selfie verification
             * 3) Proof of Address ( using Documents like: utility bills or bank statements.
             */
            yield new account_mode_1.default({
                User: user.id,
                accountNo: (0, helpers_1.generateAccountNumber)(),
            }).save({ session });
            //publish an onboarding event (this ensure the notification service is aware and send welcome email notification to the user)
            return (0, response_1.responseHandler)({
                res,
                data: user,
                message: "success",
                status: 201,
                session,
            });
        }), next, session);
    });
}
exports.default = signUp;
