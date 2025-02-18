import { Body, Controller, Get, Post } from '@nestjs/common';
import Wallet from './models/wallets.entity';
import { WalletService } from './wallet.service';

@Controller('wallets')
export class WalletController {
  constructor(private walletService: WalletService) {}

  @Post('create')
  async creatWallet(@Body() walletDto: Partial<Wallet>): Promise<Wallet> {
    return await this.walletService.createWallet(walletDto);
  }
}
