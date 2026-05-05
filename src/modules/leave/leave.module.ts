import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LeaveCategory } from './entities/leave-category.entity';
import { LeaveApplication } from './entities/leave-application.entity';
import { LeaveService } from './leave.service';
import { LeaveController } from './leave.controller';

@Module({
  imports: [TypeOrmModule.forFeature([LeaveCategory, LeaveApplication])],
  controllers: [LeaveController],
  providers: [LeaveService],
})
export class LeaveModule {}
