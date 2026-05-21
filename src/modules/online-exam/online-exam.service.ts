import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from 'nestjs-api-forge';
import { OnlineExamQuestion } from './entities/online-exam-question.entity';
import { OnlineExamSession } from './entities/online-exam-session.entity';
import { OnlineExamSubmission } from './entities/online-exam-submission.entity';
import { CreateQuestionDto } from './dto/create-question.dto';
import { CreateExamSessionDto } from './dto/create-exam-session.dto';
import { SubmitExamDto } from './dto/submit-exam.dto';

@Injectable()
export class OnlineExamService {
  constructor(
    @InjectRepository(OnlineExamQuestion)
    private questionRepo: Repository<OnlineExamQuestion>,
    @InjectRepository(OnlineExamSession)
    private sessionRepo: Repository<OnlineExamSession>,
    @InjectRepository(OnlineExamSubmission)
    private submissionRepo: Repository<OnlineExamSubmission>,
  ) {}

  // Questions
  createQuestion(dto: CreateQuestionDto) {
    return this.questionRepo.save(this.questionRepo.create(dto));
  }

  getQuestions(filters: {
    subjectId?: number;
    groupId?: number;
    branchId?: number;
  }) {
    const qb = this.questionRepo
      .createQueryBuilder('q')
      .orderBy('q.createdAt', 'DESC');
    if (filters.subjectId)
      qb.andWhere('q.subjectId = :subjectId', { subjectId: filters.subjectId });
    if (filters.groupId)
      qb.andWhere('q.groupId = :groupId', { groupId: filters.groupId });
    if (filters.branchId)
      qb.andWhere('q.branchId = :branchId', { branchId: filters.branchId });
    return qb.getMany();
  }

  async updateQuestion(id: number, dto: Partial<CreateQuestionDto>) {
    const q = await this.questionRepo.findOneBy({ id });
    if (!q) throw new NotFoundException('Question not found');
    return this.questionRepo.save({ ...q, ...dto });
  }

  async removeQuestion(id: number) {
    const q = await this.questionRepo.findOneBy({ id });
    if (!q) throw new NotFoundException('Question not found');
    return this.questionRepo.remove(q);
  }

  // Sessions
  createSession(dto: CreateExamSessionDto) {
    return this.sessionRepo.save(this.sessionRepo.create(dto));
  }

  getSessions(filters: {
    classId?: number;
    branchId?: number;
    sessionId?: number;
  }) {
    const qb = this.sessionRepo
      .createQueryBuilder('s')
      .orderBy('s.examDate', 'DESC');
    if (filters.classId)
      qb.andWhere('s.classId = :classId', { classId: filters.classId });
    if (filters.branchId)
      qb.andWhere('s.branchId = :branchId', { branchId: filters.branchId });
    if (filters.sessionId)
      qb.andWhere('s.sessionId = :sessionId', { sessionId: filters.sessionId });
    return qb.getMany();
  }

  async updateSession(id: number, dto: Partial<CreateExamSessionDto>) {
    const s = await this.sessionRepo.findOneBy({ id });
    if (!s) throw new NotFoundException('Exam session not found');
    return this.sessionRepo.save({ ...s, ...dto });
  }

  async removeSession(id: number) {
    const s = await this.sessionRepo.findOneBy({ id });
    if (!s) throw new NotFoundException('Exam session not found');
    return this.sessionRepo.remove(s);
  }

  // Submissions
  async submitExam(dto: SubmitExamDto & { studentId: number }) {
    const session = await this.sessionRepo.findOneBy({ id: dto.examSessionId });
    if (!session) throw new NotFoundException('Exam session not found');

    const questions = await this.questionRepo.find({
      where: { subjectId: session.subjectId },
    });
    let correctAnswers = 0;
    for (const q of questions) {
      if (dto.answers[q.id] === q.correctAnswer) correctAnswers++;
    }
    const totalQuestions = questions.length;
    const marksPerQuestion =
      totalQuestions > 0 ? session.totalMarks / totalQuestions : 0;
    const obtainedMarks = correctAnswers * marksPerQuestion;

    const existing = await this.submissionRepo.findOne({
      where: { examSessionId: dto.examSessionId, studentId: dto.studentId },
    });
    const record = existing || this.submissionRepo.create({});
    return this.submissionRepo.save({
      ...record,
      examSessionId: dto.examSessionId,
      studentId: dto.studentId,
      answers: dto.answers,
      totalQuestions,
      correctAnswers,
      obtainedMarks,
      submittedAt: new Date(),
      branchId: dto.branchId,
    });
  }

  getSubmissions(filters: {
    examSessionId?: number;
    studentId?: number;
    branchId?: number;
  }) {
    const qb = this.submissionRepo
      .createQueryBuilder('s')
      .orderBy('s.submittedAt', 'DESC');
    if (filters.examSessionId)
      qb.andWhere('s.examSessionId = :examSessionId', {
        examSessionId: filters.examSessionId,
      });
    if (filters.studentId)
      qb.andWhere('s.studentId = :studentId', { studentId: filters.studentId });
    if (filters.branchId)
      qb.andWhere('s.branchId = :branchId', { branchId: filters.branchId });
    return qb.getMany();
  }
}
