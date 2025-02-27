export declare enum walletStatus {
    pending = "pending",
    active = "active",
    inactive = "inactive"
}
export declare enum WalletCurrency {
    NGN = "NGN",
    USD = "USD"
}
export interface getWalletByParams {
    currency?: WalletCurrency;
    userId: string;
}
export interface CreateWalletDto {
    currency: WalletCurrency;
    userId: string;
}
