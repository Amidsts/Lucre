// export interface IWallet {
//   User: string;
//   acct_no: string;
//   currency: WalletCurrencyEnum
// }

export enum walletStatus {
  pending = 'pending',
  active = 'active',
  inactive = 'inactive',
}

export enum WalletCurrency {
  NGN = 'NGN',
  USD = 'USD',
}

export interface getWalletByParams {
  currency?: WalletCurrency;
  userId: string;
}

export interface CreateWalletDto {
  currency: WalletCurrency;
  userId: string;
}
