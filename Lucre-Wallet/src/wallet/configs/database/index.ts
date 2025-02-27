import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import WalletEntity from '../../models/wallets.entity';

export const dbConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '',
  database: 'lucre_wallet',
  entities: [WalletEntity],
  synchronize: true,
};
