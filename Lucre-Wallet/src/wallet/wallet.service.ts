import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import WalletEntity from './models/wallets.entity';
import { Repository } from 'typeorm';

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
      console.log('This user has a wallet for this currency'); //TODO: handle custom error
      return hasWalletForCurrency;
    }

    //create wallet
    return await WalletEntity.createWallet(wallet);
  }
}
