import Wallet from './models/wallets.entity';
import { WalletService } from './wallet.service';
export declare class WalletController {
    private walletService;
    constructor(walletService: WalletService);
    creatWallet(walletDto: Partial<Wallet>): Promise<Wallet>;
}
