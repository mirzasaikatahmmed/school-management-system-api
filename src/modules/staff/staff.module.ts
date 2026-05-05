import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Staff } from './entities/staff.entity';
import { StaffDepartment } from './entities/staff-department.entity';
import { StaffDesignation } from './entities/staff-designation.entity';
import { StaffService } from './staff.service';
import { StaffController } from './staff.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Staff, StaffDepartment, StaffDesignation]),
  ],
  controllers: [StaffController],
  providers: [StaffService],
  exports: [StaffService],
})
export class StaffModule {}
