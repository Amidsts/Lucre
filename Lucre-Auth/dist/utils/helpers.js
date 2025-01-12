"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateOtp = generateOtp;
exports.generateAccountNumber = generateAccountNumber;
exports.generateToken = generateToken;
const crypto_1 = require("crypto");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const configs_1 = __importDefault(require("../configs"));
const { accessTokenSecret, accessTokenLifeSpan } = configs_1.default;
function generateOtp() {
    return (0, crypto_1.randomBytes)(3).toString("hex");
}
function generateAccountNumber() {
    return "ACC" + Math.floor(1000000000 + Math.random() * 9000000000);
}
function generateToken(payload) {
    return jsonwebtoken_1.default.sign(payload, accessTokenSecret, {
        expiresIn: accessTokenLifeSpan,
        issuer: "Lucre",
    });
}
