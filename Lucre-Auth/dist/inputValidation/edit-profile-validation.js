"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editProfileInputData = void 0;
const zod_1 = __importDefault(require("zod"));
exports.editProfileInputData = zod_1.default.object({
    firstName: zod_1.default.string(),
    lastName: zod_1.default.string(),
    phoneNo: zod_1.default.string(),
    email: zod_1.default.string(),
    address: zod_1.default.string(),
    dateOfBirth: zod_1.default.string(),
});
