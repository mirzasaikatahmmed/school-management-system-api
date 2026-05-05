import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StudentAttendance } from './entities/student-attendance.entity';
import { StaffAttendance } from './entities/staff-attendance.entity';
import {
  MarkStudentAttendanceDto,
  MarkStaffAttendanceDto,
} from './dto/mark-attendance.dto';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectRepository(StudentAttendance)
    private readonly studentAttRepo: Repository<StudentAttendance>,
    @InjectRepository(StaffAttendance)
    private readonly staffAttRepo: Repository<StaffAttendance>,
  ) {}

  async markStudentAttendance(
    dto: MarkStudentAttendanceDto,
  ): Promise<StudentAttendance[]> {
    const records = dto.attendance.map((entry) =>
      this.studentAttRepo.create({
        enrollId: entry.enrollId,
        date: dto.date,
        status: entry.status,
        remark: entry.remark,
        branchId: dto.branchId,
      }),
    );
    return this.studentAttRepo.save(records);
  }

  async getStudentAttendance(filter: {
    enrollId?: number;
    date?: string;
    branchId?: number;
    fromDate?: string;
    toDate?: string;
  }): Promise<StudentAttendance[]> {
    const qb = this.studentAttRepo.createQueryBuilder('sa');
    if (filter.enrollId)
      qb.andWhere('sa.enrollId = :enrollId', { enrollId: filter.enrollId });
    if (filter.branchId)
      qb.andWhere('sa.branchId = :branchId', { branchId: filter.branchId });
    if (filter.date) qb.andWhere('sa.date = :date', { date: filter.date });
    if (filter.fromDate)
      qb.andWhere('sa.date >= :fromDate', { fromDate: filter.fromDate });
    if (filter.toDate)
      qb.andWhere('sa.date <= :toDate', { toDate: filter.toDate });
    return qb.orderBy('sa.date', 'DESC').getMany();
  }

  async markStaffAttendance(
    dto: MarkStaffAttendanceDto,
  ): Promise<StaffAttendance[]> {
    const records = dto.attendance.map((entry) =>
      this.staffAttRepo.create({
        staffId: entry.staffId,
        date: dto.date,
        status: entry.status,
        remark: entry.remark,
        branchId: dto.branchId,
      }),
    );
    return this.staffAttRepo.save(records);
  }

  async getStaffAttendance(filter: {
    staffId?: number;
    date?: string;
    branchId?: number;
    fromDate?: string;
    toDate?: string;
  }): Promise<StaffAttendance[]> {
    const qb = this.staffAttRepo.createQueryBuilder('sa');
    if (filter.staffId)
      qb.andWhere('sa.staffId = :staffId', { staffId: filter.staffId });
    if (filter.branchId)
      qb.andWhere('sa.branchId = :branchId', { branchId: filter.branchId });
    if (filter.date) qb.andWhere('sa.date = :date', { date: filter.date });
    if (filter.fromDate)
      qb.andWhere('sa.date >= :fromDate', { fromDate: filter.fromDate });
    if (filter.toDate)
      qb.andWhere('sa.date <= :toDate', { toDate: filter.toDate });
    return qb.orderBy('sa.date', 'DESC').getMany();
  }

  async getStudentAttendanceSummary(
    enrollId: number,
    fromDate: string,
    toDate: string,
  ) {
    const records = await this.studentAttRepo
      .createQueryBuilder('sa')
      .where('sa.enrollId = :enrollId', { enrollId })
      .andWhere('sa.date BETWEEN :fromDate AND :toDate', { fromDate, toDate })
      .getMany();

    const summary = { P: 0, A: 0, H: 0, L: 0, total: records.length };
    records.forEach((r) => {
      if (r.status && summary[r.status] !== undefined) summary[r.status]++;
    });
    return summary;
  }
}
