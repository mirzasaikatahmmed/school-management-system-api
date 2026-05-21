import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VisitorLog } from './entities/visitor-log.entity';
import { PostalRecord } from './entities/postal-record.entity';
import { Complaint } from './entities/complaint.entity';
import { CallLog } from './entities/call-log.entity';
import { Enquiry } from './entities/enquiry.entity';
import { ReceptionService } from './reception.service';
import { ReceptionController } from './reception.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([VisitorLog, PostalRecord, Complaint, CallLog, Enquiry]),
  ],
  controllers: [ReceptionController],
  providers: [ReceptionService],
})
export class ReceptionModule {}
