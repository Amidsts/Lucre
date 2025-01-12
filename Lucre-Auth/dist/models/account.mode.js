"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const accountSchema = new mongoose_1.Schema({
    User: { type: mongoose_1.Schema.Types.ObjectId, ref: "User" },
    accountNo: { type: String, required: true, unique: true },
    balance: { type: Number, default: 0 },
}, { timestamps: true });
const AccountModel = (0, mongoose_1.model)("account", accountSchema);
exports.default = AccountModel;
