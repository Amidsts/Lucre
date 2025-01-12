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
const response_1 = require("../utils/response");
function editProfile(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { firstName, lastName, phoneNo, email, address, dateOfBirth } = req.body;
        const { user } = req;
        return (0, request_wrapper_1.asyncWrapper)(() => __awaiter(this, void 0, void 0, function* () {
            user.firstName = firstName;
            user.lastName = lastName;
            user.email = email;
            user.fullName = `${firstName} ${lastName}`;
            user.phoneNo = phoneNo;
            user.address = address;
            user.dateOfBirth = dateOfBirth;
            yield user.save();
            return (0, response_1.responseHandler)({
                res,
                data: user,
                message: "profile update successful",
            });
        }), next);
    });
}
exports.default = editProfile;
