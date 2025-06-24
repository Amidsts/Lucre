"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createWalletSchema = exports.ValidateInputPipe = void 0;
const joi = require("joi");
const common_1 = require("@nestjs/common");
const wallet_interface_1 = require("../types/wallet.interface");
class ValidateInputPipe {
    constructor(schema) {
        this.schema = schema;
    }
    transform(data, _metadata) {
        const { error, value } = this.schema.validate(data);
        if (error) {
            throw new common_1.BadRequestException(`Validation failed ${error.details[0].message}`);
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