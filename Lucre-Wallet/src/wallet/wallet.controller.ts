import { Body, Controller, Get, Post, Query, UsePipes } from '@nestjs/common';
import Wallet from './models/wallets.entity';
import { WalletService } from './wallet.service';
import {
  CreateWalletDto,
  getWalletByParams,
} from '../utils/types/wallet.interface';
import logger from 'src/utils/logger';
import {
  createWalletSchema,
  ValidateInputPipe,
} from 'src/utils/inputValidatorPipes/wallets-validators';

@Controller('wallets') //winston logger
export class WalletController {
  constructor(private walletService: WalletService) {}

  @Post('create')
  @UsePipes(new ValidateInputPipe(createWalletSchema))
  async creatWallet(@Body() createWalletDto: CreateWalletDto): Promise<Wallet> {
    return await this.walletService.createWallet(createWalletDto);
  }

  @Get() //TODO: add middleware
  async getWallets(@Query() params: getWalletByParams): Promise<Wallet[]> {
    const { currency, userId } = params; //get userId from the access token
    return await this.walletService.getWallets({ currency, userId });
  }
}
