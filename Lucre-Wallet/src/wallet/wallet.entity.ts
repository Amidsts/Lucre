import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import {
  WalletCurrencyEnum,
  walletStatusEnum,
} from './utils/interfaces/wallet.interface';

@Entity()
export class Wallet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  User: string;

  @Column({ unique: true })
  acct_no: string;

  @Column({ default: 0 })
  balance: number;

  @Column({
    type: 'enum',
    enum: WalletCurrencyEnum,
    default: WalletCurrencyEnum.NGN,
  })
  currency: WalletCurrencyEnum;

  @Column({
    type: 'enum',
    enum: walletStatusEnum,
    default: walletStatusEnum.inactive,
  })
  status: walletStatusEnum;
}
