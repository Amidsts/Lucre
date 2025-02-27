import WalletEntity from './models/wallets.entity';
import { Repository } from 'typeorm';
import { getWalletByParams } from '../utils/types/wallet.interface';
export declare class WalletService {
    private walletRepository;
    constructor(walletRepository: Repository<WalletEntity>);
    createWallet(wallet: Partial<WalletEntity>): Promise<WalletEntity>;
    getWallets({ currency, userId, }: getWalletByParams): Promise<WalletEntity[]>;
}
