// export interface IWallet {
//   User: string;
//   acct_no: string;
//   currency: WalletCurrencyEnum
// }

export enum walletStatusEnum {
  pending = 'pending',
  active = 'active',
  inactive = 'inactive',
}

export enum WalletCurrencyEnum {
  NGN = 'NGN',
  USD = 'USD',
}
