import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from 'nestjs-api-forge';
import { Exam } from './entities/exam.entity';
import { ExamTerm } from './entities/exam-term.entity';
import { Grade } from './entities/grade.entity';
import { Mark } from './entities/mark.entity';
import { ExamHall } from './entities/exam-hall.entity';
import {
  CreateExamDto,
  CreateExamTermDto,
  CreateGradeDto,
  SubmitMarkDto,
} from './dto/create-exam.dto';
import { CreateExamHallDto } from './dto/create-exam-hall.dto';

@Injectable()
export class ExamService {
  constructor(
    @InjectRepository(Exam)
    private readonly examRepo: Repository<Exam>,
    @InjectRepository(ExamTerm)
    private readonly termRepo: Repository<ExamTerm>,
    @InjectRepository(Grade)
    private readonly gradeRepo: Repository<Grade>,
    @InjectRepository(Mark)
    private readonly markRepo: Repository<Mark>,
    @InjectRepository(ExamHall)
    private readonly hallRepo: Repository<ExamHall>,
  ) {}

  async createTerm(dto: CreateExamTermDto): Promise<ExamTerm> {
    return this.termRepo.save(this.termRepo.create(dto));
  }

  async getTerms(branchId?: number, sessionId?: number): Promise<ExamTerm[]> {
    const where: any = {};
    if (branchId) where.branchId = branchId;
    if (sessionId) where.sessionId = sessionId;
    return this.termRepo.find({ where });
  }

  async createExam(dto: CreateExamDto): Promise<Exam> {
    return this.examRepo.save(this.examRepo.create(dto));
  }

  async getExams(branchId?: number, sessionId?: number): Promise<Exam[]> {
    const where: any = {};
    if (branchId) where.branchId = branchId;
    if (sessionId) where.sessionId = sessionId;
    return this.examRepo.find({ where, order: { createdAt: 'DESC' } });
  }

  async findExam(id: number): Promise<Exam> {
    const exam = await this.examRepo.findOne({ where: { id } });
    if (!exam) throw new NotFoundException('Exam not found');
    return exam;
  }

  async updateExam(id: number, dto: Partial<CreateExamDto>): Promise<Exam> {
    const exam = await this.findExam(id);
    Object.assign(exam, dto);
    return this.examRepo.save(exam);
  }

  async createGrade(dto: CreateGradeDto): Promise<Grade> {
    return this.gradeRepo.save(this.gradeRepo.create(dto));
  }

  async getGrades(branchId?: number): Promise<Grade[]> {
    const where = branchId ? { branchId } : {};
    return this.gradeRepo.find({ where, order: { upperMark: 'DESC' } });
  }

  async submitMark(dto: SubmitMarkDto): Promise<Mark> {
    const existing = await this.markRepo.findOne({
      where: {
        studentId: dto.studentId,
        subjectId: dto.subjectId,
        examId: dto.examId,
      },
    });
    if (existing) {
      Object.assign(existing, dto);
      return this.markRepo.save(existing);
    }
    return this.markRepo.save(this.markRepo.create(dto));
  }

  async getMarks(filter: {
    examId?: number;
    classId?: number;
    sectionId?: number;
    studentId?: number;
    sessionId?: number;
    branchId?: number;
  }): Promise<Mark[]> {
    const where: any = {};
    Object.entries(filter).forEach(([k, v]) => {
      if (v !== undefined) where[k] = v;
    });
    return this.markRepo.find({ where });
  }

  // Exam Halls
  createHall(dto: CreateExamHallDto): Promise<ExamHall> {
    return this.hallRepo.save(this.hallRepo.create(dto));
  }

  getHalls(branchId?: number): Promise<ExamHall[]> {
    return this.hallRepo.find({
      where: branchId ? { branchId } : {},
      order: { hallNo: 'ASC' },
    });
  }

  async updateHall(id: number, dto: Partial<CreateExamHallDto>): Promise<ExamHall> {
    const hall = await this.hallRepo.findOneBy({ id });
    if (!hall) throw new NotFoundException('Exam hall not found');
    return this.hallRepo.save({ ...hall, ...dto });
  }

  async removeHall(id: number): Promise<void> {
    const hall = await this.hallRepo.findOneBy({ id });
    if (!hall) throw new NotFoundException('Exam hall not found');
    await this.hallRepo.remove(hall);
  }
}
