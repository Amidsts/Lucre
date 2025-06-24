import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbConfig } from './configs/database';
import { WalletModule } from './wallet/wallet.module';
import { UsersModule } from './users/users.module';
@Module({
  imports: [TypeOrmModule.forRoot(dbConfig), WalletModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
