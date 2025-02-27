import { BaseEntity, FindOptionsWhere } from 'typeorm';
import { WalletCurrency, walletStatus } from '../../utils/types/wallet.interface';
export default class WalletEntity extends BaseEntity {
    id: number;
    userId: string;
    acct_no: string;
    balance: number;
    currency: WalletCurrency;
    status: walletStatus;
    static createWallet(params: Partial<WalletEntity>): Promise<WalletEntity>;
    static getWalletByParams(params: FindOptionsWhere<WalletEntity>): Promise<WalletEntity>;
    static getWalletsByParams(params: FindOptionsWhere<WalletEntity>): Promise<WalletEntity[]>;
}
