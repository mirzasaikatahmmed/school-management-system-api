import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from '../student/entities/student.entity';
import { Enroll } from '../student/entities/enroll.entity';
import { Parent } from '../parents/entities/parent.entity';
import { LoginCredential } from '../auth/entities/login-credential.entity';
import { TransportAssign } from '../transport/entities/transport-assign.entity';
import { HostelAllocation } from '../hostel/entities/hostel-allocation.entity';
import { AdmissionService } from './admission.service';
import { AdmissionController } from './admission.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Student,
      Enroll,
      Parent,
      LoginCredential,
      TransportAssign,
      HostelAllocation,
    ]),
  ],
  controllers: [AdmissionController],
  providers: [AdmissionService],
})
export class AdmissionModule {}
