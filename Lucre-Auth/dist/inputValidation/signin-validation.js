"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signinInputData = void 0;
const zod_1 = require("zod");
exports.signinInputData = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string(),
});
