import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SalaryTemplate } from './entities/salary-template.entity';
import { SalaryTemplateDetail } from './entities/salary-template-detail.entity';
import { Payroll } from './entities/payroll.entity';
import { PayrollService } from './payroll.service';
import { PayrollController } from './payroll.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([SalaryTemplate, SalaryTemplateDetail, Payroll]),
  ],
  controllers: [PayrollController],
  providers: [PayrollService],
})
export class PayrollModule {}
