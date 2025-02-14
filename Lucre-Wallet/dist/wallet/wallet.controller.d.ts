import { Wallet } from './wallet.entity';
import { WalletService } from './wallet.service';
import { IWallet } from './utils/interfaces/wallet.interface';
export declare class WalletController {
    private walletService;
    constructor(walletService: WalletService);
    creatWallet(walletDto: IWallet): Promise<Wallet>;
}
