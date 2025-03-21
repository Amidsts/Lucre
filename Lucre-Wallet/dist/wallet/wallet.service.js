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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const wallets_entity_1 = require("./models/wallets.entity");
const typeorm_2 = require("typeorm");
const logger_1 = require("../utils/logger");
let WalletService = class WalletService {
    constructor(walletRepository) {
        this.walletRepository = walletRepository;
    }
    async createWallet(wallet) {
        const { userId } = wallet;
        const hasWalletForCurrency = await wallets_entity_1.default.getWalletByParams({
            userId,
            currency: wallet.currency,
        });
        if (hasWalletForCurrency) {
            logger_1.default.error('This user has a wallet for this currency', { userId });
            return hasWalletForCurrency;
        }
        return await wallets_entity_1.default.createWallet(wallet);
    }
    async getWallets({ currency, userId, }) {
        return await wallets_entity_1.default.getWalletsByParams({ currency, userId });
    }
};
WalletService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(wallets_entity_1.default)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], WalletService);
exports.WalletService = WalletService;
//# sourceMappingURL=wallet.service.js.map