import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiForgeModule } from 'nestjs-api-forge';
import databaseConfig from './config/database.config';
import jwtConfig from './config/jwt.config';
import { AuthModule } from './modules/auth/auth.module';
import { BranchModule } from './modules/branch/branch.module';
import { AcademicModule } from './modules/academic/academic.module';
import { StudentModule } from './modules/student/student.module';
import { StaffModule } from './modules/staff/staff.module';
import { AttendanceModule } from './modules/attendance/attendance.module';
import { FeesModule } from './modules/fees/fees.module';
import { ExamModule } from './modules/exam/exam.module';
import { LibraryModule } from './modules/library/library.module';
import { TransportModule } from './modules/transport/transport.module';
import { HostelModule } from './modules/hostel/hostel.module';
import { CommunicationModule } from './modules/communication/communication.module';
import { AccountingModule } from './modules/accounting/accounting.module';
import { PayrollModule } from './modules/payroll/payroll.module';
import { AdvanceSalaryModule } from './modules/advance-salary/advance-salary.module';
import { LeaveModule } from './modules/leave/leave.module';
import { ParentsModule } from './modules/parents/parents.module';
import { TimetableModule } from './modules/timetable/timetable.module';
import { OnlineExamModule } from './modules/online-exam/online-exam.module';
import { HomeworkModule } from './modules/homework/homework.module';
import { ReceptionModule } from './modules/reception/reception.module';
import { InventoryModule } from './modules/inventory/inventory.module';
import { CertificateModule } from './modules/certificate/certificate.module';
import { AwardModule } from './modules/award/award.module';
import { AlumniModule } from './modules/alumni/alumni.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { AdmissionModule } from './modules/admission/admission.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, jwtConfig],
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => config.get('database')!,
    }),
    ApiForgeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        version: config.get<string>('API_VERSION') || '1.0',
        defaultSuccessMessage: 'Request successful',
        includePath: true,
        includeTimestamp: true,
      }),
    }),
    AuthModule,
    BranchModule,
    AcademicModule,
    StudentModule,
    StaffModule,
    AttendanceModule,
    FeesModule,
    ExamModule,
    LibraryModule,
    TransportModule,
    HostelModule,
    CommunicationModule,
    AccountingModule,
    PayrollModule,
    AdvanceSalaryModule,
    LeaveModule,
    ParentsModule,
    TimetableModule,
    OnlineExamModule,
    HomeworkModule,
    ReceptionModule,
    InventoryModule,
    CertificateModule,
    AwardModule,
    AlumniModule,
    DashboardModule,
    AdmissionModule,
  ],
})
export class AppModule {}
