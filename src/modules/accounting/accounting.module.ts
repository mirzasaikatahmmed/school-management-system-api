import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './entities/account.entity';
import { VoucherHead } from './entities/voucher-head.entity';
import { Transaction } from './entities/transaction.entity';
import { AccountingService } from './accounting.service';
import { AccountingController } from './accounting.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Account, VoucherHead, Transaction])],
  controllers: [AccountingController],
  providers: [AccountingService],
})
export class AccountingModule {}
