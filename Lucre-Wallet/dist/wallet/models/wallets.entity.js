"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const wallet_interface_1 = require("../utils/types/wallet.interface");
const helpers_1 = require("../../controllers/helpers");
let WalletEntity = class WalletEntity extends typeorm_1.BaseEntity {
    static async createWallet(params) {
        return await this.getRepository().save({
            ...params,
            acct_no: (0, helpers_1.generateAccountNumber)(),
        });
    }
    static async getWalletByParams(params) {
        return await this.getRepository().findOne({
            where: params,
        });
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], WalletEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], WalletEntity.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], WalletEntity.prototype, "acct_no", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], WalletEntity.prototype, "balance", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: wallet_interface_1.WalletCurrencyEnum,
        default: wallet_interface_1.WalletCurrencyEnum.NGN,
    }),
    __metadata("design:type", String)
], WalletEntity.prototype, "currency", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: wallet_interface_1.walletStatusEnum,
        default: wallet_interface_1.walletStatusEnum.inactive,
    }),
    __metadata("design:type", String)
], WalletEntity.prototype, "status", void 0);
WalletEntity = __decorate([
    (0, typeorm_1.Entity)('wallet')
], WalletEntity);
exports.default = WalletEntity;
//# sourceMappingURL=wallets.entity.js.map