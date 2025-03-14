"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signupInputData = void 0;
const zod_1 = __importDefault(require("zod"));
exports.signupInputData = zod_1.default
    .object({
    firstName: zod_1.default.string(),
    lastName: zod_1.default.string(),
    phoneNo: zod_1.default.string(),
    email: zod_1.default.string(),
    password: zod_1.default
        .string()
        .min(8)
        .regex(/^(?=.*[0-9])(?=.*[!@#$%^&*])/, {
        message: "Password must be at least 8 characters long, contain at least one special character, and at least one number.",
    }),
    confirmPassword: zod_1.default.string(),
    address: zod_1.default.string(),
    dateOfBirth: zod_1.default.string(),
})
    .refine(({ password, confirmPassword }) => {
    return password === confirmPassword;
});
