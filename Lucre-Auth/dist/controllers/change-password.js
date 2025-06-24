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
Object.defineProperty(exports, "__esModule", { value: true });
const request_wrapper_1 = require("../utils/request-wrapper");
const lucre_common_1 = require("lucre-common");
const response_1 = require("../utils/response");
function changePassword(req, res, next) {
    const { newPassword, currentPassword } = req.body;
    const { user } = req;
    return (0, request_wrapper_1.asyncWrapper)(() => __awaiter(this, void 0, void 0, function* () {
        if (!user.comparePassword(currentPassword))
            throw new lucre_common_1.errors.BadRequestError("Incorrect password");
        user.password = newPassword;
        yield user.save();
        return (0, response_1.responseHandler)({ res, message: "password changed successfully" });
    }), next);
}
exports.default = changePassword;
