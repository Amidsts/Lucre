import {TypeOrmModuleOptions} from "@nestjs/typeorm"
import { Wallet } from "src/wallet/models/wallets.entity";

export const dbConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'admin',
  database: 'lucre_wallet',
  entities: [Wallet],
  synchronize: true,
};