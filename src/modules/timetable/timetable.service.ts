import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from 'nestjs-api-forge';
import { Timetable } from './entities/timetable.entity';
import { ExamTimetable } from './entities/exam-timetable.entity';

@Injectable()
export class TimetableService {
  constructor(
    @InjectRepository(Timetable) private timetableRepo: Repository<Timetable>,
    @InjectRepository(ExamTimetable)
    private examTimetableRepo: Repository<ExamTimetable>,
  ) {}

  createEntry(dto: any) {
    return this.timetableRepo.save(this.timetableRepo.create(dto));
  }

  getEntries(filters: {
    classId?: number;
    sectionId?: number;
    branchId?: number;
    sessionId?: number;
  }) {
    const qb = this.timetableRepo
      .createQueryBuilder('t')
      .orderBy('t.dayOfWeek')
      .addOrderBy('t.startTime');
    if (filters.classId)
      qb.andWhere('t.classId = :classId', { classId: filters.classId });
    if (filters.sectionId)
      qb.andWhere('t.sectionId = :sectionId', { sectionId: filters.sectionId });
    if (filters.branchId)
      qb.andWhere('t.branchId = :branchId', { branchId: filters.branchId });
    if (filters.sessionId)
      qb.andWhere('t.sessionId = :sessionId', { sessionId: filters.sessionId });
    return qb.getMany();
  }

  async updateEntry(id: number, dto: any) {
    const entry = await this.timetableRepo.findOneBy({ id });
    if (!entry) throw new NotFoundException('Timetable entry not found');
    return this.timetableRepo.save({ ...entry, ...dto });
  }

  async removeEntry(id: number) {
    const entry = await this.timetableRepo.findOneBy({ id });
    if (!entry) throw new NotFoundException('Timetable entry not found');
    return this.timetableRepo.remove(entry);
  }

  createExamEntry(dto: any) {
    return this.examTimetableRepo.save(this.examTimetableRepo.create(dto));
  }

  getExamEntries(filters: {
    examId?: number;
    classId?: number;
    branchId?: number;
    sessionId?: number;
  }) {
    const qb = this.examTimetableRepo
      .createQueryBuilder('et')
      .orderBy('et.examDate')
      .addOrderBy('et.startTime');
    if (filters.examId)
      qb.andWhere('et.examId = :examId', { examId: filters.examId });
    if (filters.classId)
      qb.andWhere('et.classId = :classId', { classId: filters.classId });
    if (filters.branchId)
      qb.andWhere('et.branchId = :branchId', { branchId: filters.branchId });
    if (filters.sessionId)
      qb.andWhere('et.sessionId = :sessionId', {
        sessionId: filters.sessionId,
      });
    return qb.getMany();
  }

  async removeExamEntry(id: number) {
    const entry = await this.examTimetableRepo.findOneBy({ id });
    if (!entry) throw new NotFoundException('Exam timetable entry not found');
    return this.examTimetableRepo.remove(entry);
  }
}
