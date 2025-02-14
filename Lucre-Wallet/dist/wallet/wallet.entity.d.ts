import { WalletCurrencyEnum, walletStatusEnum } from './utils/interfaces/wallet.interface';
export declare class Wallet {
    id: number;
    User: string;
    acct_no: string;
    balance: number;
    currency: WalletCurrencyEnum;
    status: walletStatusEnum;
}
