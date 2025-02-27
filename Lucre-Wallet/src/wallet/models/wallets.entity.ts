import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  FindOptionsWhere,
} from 'typeorm';
import {
  WalletCurrency,
  walletStatus,
} from '../../utils/types/wallet.interface';
import { generateAccountNumber } from 'src/utils/helpers';

@Entity('wallet')
export default class WalletEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: string;

  @Column({ unique: true })
  acct_no: string;

  @Column({ default: 0 })
  balance: number;

  @Column({
    type: 'enum',
    enum: WalletCurrency,
    default: WalletCurrency.NGN,
  })
  currency: WalletCurrency;

  @Column({
    type: 'enum',
    enum: walletStatus,
    default: walletStatus.inactive,
  })
  status: walletStatus;

  static async createWallet(
    params: Partial<WalletEntity>,
  ): Promise<WalletEntity> {
    return await this.getRepository().save({
      ...params,
      acct_no: generateAccountNumber(),
    });
  }

  static async getWalletByParams(
    params: FindOptionsWhere<WalletEntity>,
  ): Promise<WalletEntity> {
    return await this.getRepository().findOne({
      where: params,
    });
  }

  static async getWalletsByParams(
    params: FindOptionsWhere<WalletEntity>,
  ): Promise<WalletEntity[]> {
    return await this.getRepository().find({
      where: params,
    });
  }
}
