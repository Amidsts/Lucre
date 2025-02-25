import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  FindOptionsWhere,
} from 'typeorm';
import {
  WalletCurrencyEnum,
  walletStatusEnum,
} from '../utils/types/wallet.interface';
import { generateAccountNumber } from 'src/controllers/helpers';

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
}
