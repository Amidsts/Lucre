"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const inputValidation_1 = __importDefault(require("./inputValidation"));
const signup_validation_1 = require("./inputValidation/signup-validation");
const signup_1 = __importDefault(require("./controllers/signup"));
const router = (0, express_1.Router)();
router.post("/signup", (0, inputValidation_1.default)(signup_validation_1.signupInputData), signup_1.default);
exports.default = router;
