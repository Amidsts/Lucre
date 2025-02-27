"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createWalletSchema = exports.ValidateInputPipe = void 0;
const joi = require("joi");
const wallet_interface_1 = require("../types/wallet.interface");
class ValidateInputPipe {
    constructor(schema) {
        this.schema = schema;
    }
    transform(data, _metadata) {
        const { error, value } = this.schema.validate(data);
        if (error) {
            console.log(JSON.stringify(error.details[0]));
            throw error;
        }
        return value;
    }
}
exports.ValidateInputPipe = ValidateInputPipe;
exports.createWalletSchema = joi.object({
    currency: joi
        .string()
        .valid(...Object.values(wallet_interface_1.WalletCurrency))
        .required(),
    userId: joi.string(),
});
//# sourceMappingURL=wallets-validators.js.map