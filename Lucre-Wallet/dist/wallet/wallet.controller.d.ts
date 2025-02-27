import Wallet from './models/wallets.entity';
import { WalletService } from './wallet.service';
import { CreateWalletDto, getWalletByParams } from '../utils/types/wallet.interface';
export declare class WalletController {
    private walletService;
    constructor(walletService: WalletService);
    creatWallet(createWalletDto: CreateWalletDto): Promise<Wallet>;
    getWallets(params: getWalletByParams): Promise<Wallet[]>;
}
