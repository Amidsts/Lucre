"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPasswordSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.resetPasswordSchema = zod_1.default
    .object({
    email: zod_1.default.string().email(),
    otp: zod_1.default.string(),
    newPassword: zod_1.default
        .string()
        .min(8)
        .regex(/^(?=.*[0-9])(?=.*[!@#$%^&*])/, {
        message: "Password must be at least 8 characters long, contain at least one special character, and at least one number.",
    }),
    confirmPassword: zod_1.default.string(),
})
    .refine(({ newPassword, confirmPassword }) => {
    return newPassword === confirmPassword;
});
