import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import WalletEntity from '../../wallet/models/wallets.entity';
import User from 'src/users/entities/user.entity';

export const dbConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '',
  database: 'lucre_wallet',
  entities: [WalletEntity, User],
  synchronize: true,
};
