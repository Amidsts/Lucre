import WalletEntity from './models/wallets.entity';
import { Repository } from 'typeorm';
export declare class WalletService {
    private walletRepository;
    constructor(walletRepository: Repository<WalletEntity>);
    createWallet(wallet: Partial<WalletEntity>): Promise<WalletEntity>;
}
