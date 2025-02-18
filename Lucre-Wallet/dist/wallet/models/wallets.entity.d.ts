import { BaseEntity, FindOptionsWhere } from 'typeorm';
import { WalletCurrencyEnum, walletStatusEnum } from '../utils/types/wallet.interface';
export default class WalletEntity extends BaseEntity {
    id: number;
    userId: string;
    acct_no: string;
    balance: number;
    currency: WalletCurrencyEnum;
    status: walletStatusEnum;
    static createWallet(params: Partial<WalletEntity>): Promise<WalletEntity>;
    static getWalletByParams(params: FindOptionsWhere<WalletEntity>): Promise<WalletEntity>;
}
