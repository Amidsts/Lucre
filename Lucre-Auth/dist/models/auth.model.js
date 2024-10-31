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
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const authSchema = new mongoose_1.Schema({
    firstName: String,
    lastName: String,
    fullName: String,
    phoneNo: String,
    email: String,
    password: String,
    address: String,
    dateOfBirth: String,
}, {
    timestamps: true,
    toJSON: {
        transform: function (_doc, ret) {
            ret.id = ret._id;
            ret.version = ret.__v;
            delete ret._id;
            delete ret.__v;
            delete ret.password;
        },
    },
});
authSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (this.isModified("password")) {
            const salt = yield bcrypt_1.default.genSalt(10);
            this.password = yield bcrypt_1.default.hash(this.password, salt);
        }
        next();
    });
});
authSchema.methods.comparePassword = function (Password) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcrypt_1.default.compare(Password, this.password);
    });
};
const AuthModel = (0, mongoose_1.model)("Auth", authSchema);
exports.default = AuthModel;
