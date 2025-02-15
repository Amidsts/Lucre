import { Body, Controller, Get, Post } from '@nestjs/common';
import { Wallet } from './models/wallets.entity';
import { WalletService } from './wallet.service';
import { IWallet } from './utils/interfaces/wallet.interface';

@Controller('wallets')
export class WalletController {
  constructor(private walletService: WalletService) {}

  @Post('create')
  async creatWallet(@Body() walletDto: IWallet): Promise<Wallet> {
    return await this.walletService.createWallet(walletDto);
  }
}
