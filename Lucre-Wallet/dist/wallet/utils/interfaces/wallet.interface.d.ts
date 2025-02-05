export interface IWallet {
    User: string;
    acct_no: string;
    currency: WalletCurrencyEnum;
}
export declare enum walletStatusEnum {
    pending = "pending",
    active = "active",
    inactive = "inactive"
}
export declare enum WalletCurrencyEnum {
    NGN = "NGN",
    USD = "USD"
}
