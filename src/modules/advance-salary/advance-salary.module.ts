import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdvanceSalary } from '../student/entities/advance-salary.entity';
import { AdvanceSalaryService } from './advance-salary.service';
import { AdvanceSalaryController } from './advance-salary.controller';

@Module({
  imports: [TypeOrmModule.forFeature([AdvanceSalary])],
  controllers: [AdvanceSalaryController],
  providers: [AdvanceSalaryService],
})
export class AdvanceSalaryModule {}
