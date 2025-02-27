import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import WalletEntity from './models/wallets.entity';
import { Repository } from 'typeorm';
import { getWalletByParams } from '../utils/types/wallet.interface';
import logger from 'src/utils/logger';

@Injectable()
export class WalletService {
  constructor(
    @InjectRepository(WalletEntity)
    private walletRepository: Repository<WalletEntity>,
  ) {}

  async createWallet(wallet: Partial<WalletEntity>): Promise<WalletEntity> {
    const { userId } = wallet;
    const hasWalletForCurrency = await WalletEntity.getWalletByParams({
      userId,
      currency: wallet.currency,
    });
    if (hasWalletForCurrency) {
      logger.error('This user has a wallet for this currency', { userId });
      return hasWalletForCurrency;
    }

    return await WalletEntity.createWallet(wallet);
  }

  async getWallets({
    currency,
    userId,
  }: getWalletByParams): Promise<WalletEntity[]> {
    return await WalletEntity.getWalletsByParams({ currency, userId });
  }
}
