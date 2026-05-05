import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from 'nestjs-api-forge';
import { Homework } from './entities/homework.entity';
import { HomeworkSubmission } from './entities/homework-submission.entity';

@Injectable()
export class HomeworkService {
  constructor(
    @InjectRepository(Homework) private homeworkRepo: Repository<Homework>,
    @InjectRepository(HomeworkSubmission)
    private submissionRepo: Repository<HomeworkSubmission>,
  ) {}

  createHomework(dto: any, teacherId: number) {
    return this.homeworkRepo.save(
      this.homeworkRepo.create({ ...dto, teacherId }),
    );
  }

  getHomeworks(filters: {
    classId?: number;
    sectionId?: number;
    subjectId?: number;
    branchId?: number;
    sessionId?: number;
  }) {
    const qb = this.homeworkRepo
      .createQueryBuilder('h')
      .orderBy('h.submissionDate', 'DESC');
    if (filters.classId)
      qb.andWhere('h.classId = :classId', { classId: filters.classId });
    if (filters.sectionId)
      qb.andWhere('h.sectionId = :sectionId', { sectionId: filters.sectionId });
    if (filters.subjectId)
      qb.andWhere('h.subjectId = :subjectId', { subjectId: filters.subjectId });
    if (filters.branchId)
      qb.andWhere('h.branchId = :branchId', { branchId: filters.branchId });
    if (filters.sessionId)
      qb.andWhere('h.sessionId = :sessionId', { sessionId: filters.sessionId });
    return qb.getMany();
  }

  async updateHomework(id: number, dto: any) {
    const hw = await this.homeworkRepo.findOneBy({ id });
    if (!hw) throw new NotFoundException('Homework not found');
    return this.homeworkRepo.save({ ...hw, ...dto });
  }

  async removeHomework(id: number) {
    const hw = await this.homeworkRepo.findOneBy({ id });
    if (!hw) throw new NotFoundException('Homework not found');
    return this.homeworkRepo.remove(hw);
  }

  submitHomework(dto: any, studentId: number) {
    return this.submissionRepo.save(
      this.submissionRepo.create({ ...dto, studentId }),
    );
  }

  getSubmissions(filters: { homeworkId?: number; studentId?: number }) {
    const qb = this.submissionRepo
      .createQueryBuilder('s')
      .orderBy('s.submittedAt', 'DESC');
    if (filters.homeworkId)
      qb.andWhere('s.homeworkId = :homeworkId', {
        homeworkId: filters.homeworkId,
      });
    if (filters.studentId)
      qb.andWhere('s.studentId = :studentId', { studentId: filters.studentId });
    return qb.getMany();
  }

  async evaluateSubmission(
    id: number,
    dto: { obtainedMarks?: number; feedback?: string },
    evaluatedBy: number,
  ) {
    const sub = await this.submissionRepo.findOneBy({ id });
    if (!sub) throw new NotFoundException('Submission not found');
    return this.submissionRepo.save({
      ...sub,
      ...dto,
      evaluatedBy,
      evaluated: true,
    });
  }
}
