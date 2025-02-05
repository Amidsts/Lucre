import { Wallet } from './wallet.entity';
import { Repository } from 'typeorm';
import { IWallet } from './utils/interfaces/wallet.interface';
export declare class WalletService {
    private walletRepository;
    constructor(walletRepository: Repository<Wallet>);
    createWallet(wallet: IWallet): Promise<Wallet>;
}
