import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Wallet } from './wallet.entity';
import { Repository } from 'typeorm';
import { IWallet } from './utils/interfaces/wallet.interface';

@Injectable()
export class WalletService {
  constructor(
    @InjectRepository(Wallet)
    private walletRepository: Repository<Wallet>,
  ) {}

  async createWallet(wallet: IWallet): Promise<Wallet> {
    const newWallet = new Wallet();
    newWallet.User = wallet.User;
    newWallet.acct_no = wallet.acct_no;
    newWallet.currency = wallet.currency;

    return await this.walletRepository.save(newWallet);
  }
}
