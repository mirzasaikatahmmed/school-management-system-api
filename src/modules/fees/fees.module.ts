import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeesType } from './entities/fees-type.entity';
import { FeeGroup } from './entities/fee-group.entity';
import { FeeAllocation } from './entities/fee-allocation.entity';
import { FeePaymentHistory } from './entities/fee-payment-history.entity';
import { FeesService } from './fees.service';
import { FeesController } from './fees.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      FeesType,
      FeeGroup,
      FeeAllocation,
      FeePaymentHistory,
    ]),
  ],
  controllers: [FeesController],
  providers: [FeesService],
  exports: [FeesService],
})
export class FeesModule {}
