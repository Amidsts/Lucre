import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import WalletEntity from './models/wallets.entity';
import { Repository } from 'typeorm';
import { IWallet } from './utils/interfaces/wallet.interface';

@Injectable()
export class WalletService {
  constructor(
    @InjectRepository(WalletEntity)
    private walletRepository: Repository<WalletEntity>,
  ) {}

  async createWallet(wallet: Partial<WalletEntity>): Promise<WalletEntity> {
    //check if user doesn't have a wallet with the given currency

    const hasWalletForCurrency = await WalletEntity.getWalletByParams({
      currency: wallet.currency,
    });
    if (hasWalletForCurrency) {
      //throw an error
      console.log('error'); //TODO: handle custom error
      return hasWalletForCurrency;
    }

    //create wallet
    return await WalletEntity.createWallet(wallet);
  }
}
