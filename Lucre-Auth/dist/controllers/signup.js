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
const lucre_common_1 = require("lucre-common");
const request_wrapper_1 = require("../utils/request-wrapper");
const user_model_1 = __importDefault(require("../models/user.model"));
const response_1 = require("../utils/response");
const publisher = __importStar(require("../rmqManager"));
function signUp(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        return (0, request_wrapper_1.asyncWrapper)(() => __awaiter(this, void 0, void 0, function* () {
            let user = (yield user_model_1.default.findOne({ email: req.body.email }));
            if (user)
                throw new lucre_common_1.errors.ConflictError("Account already exists");
            user = yield saveNewUser(req.body);
            const { _id, firstName, lastName, fullName, phoneNo, email, address, dateOfBirth, } = user;
            //IMPLEMENT KYC
            yield publisher.createNewUser({
                id: String(_id),
                firstName,
                lastName,
                fullName,
                phoneNo,
                email,
                address,
                dateOfBirth,
            });
            return (0, response_1.responseHandler)({
                res,
                data: user,
                message: "success",
                status: 201,
            });
        }), next);
    });
}
function saveNewUser(params) {
    return __awaiter(this, void 0, void 0, function* () {
        const { firstName, lastName } = params;
        return new user_model_1.default(Object.assign(Object.assign({}, params), { fullName: `${firstName} ${lastName}` })).save();
    });
}
exports.default = signUp;
