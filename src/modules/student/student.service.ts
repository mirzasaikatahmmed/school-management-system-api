import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from 'nestjs-api-forge';
import { Student } from './entities/student.entity';
import { Enroll } from './entities/enroll.entity';
import { StudentCategory } from './entities/student-category.entity';
import { StudentPromotion } from './entities/student-promotion.entity';
import { CreateStudentDto } from './dto/create-student.dto';
import { CreateEnrollDto } from './dto/create-enroll.dto';

export interface StudentQueryFilter {
  branchId?: number;
  sessionId?: number;
  classId?: number;
  sectionId?: number;
  active?: boolean;
  search?: string;
}

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepo: Repository<Student>,
    @InjectRepository(Enroll)
    private readonly enrollRepo: Repository<Enroll>,
    @InjectRepository(StudentCategory)
    private readonly categoryRepo: Repository<StudentCategory>,
    @InjectRepository(StudentPromotion)
    private readonly promotionRepo: Repository<StudentPromotion>,
  ) {}

  async create(dto: CreateStudentDto): Promise<Student> {
    const student = this.studentRepo.create(dto);
    return this.studentRepo.save(student);
  }

  async findAll(filter: StudentQueryFilter): Promise<Student[]> {
    const qb = this.studentRepo.createQueryBuilder('s');

    if (filter.active !== undefined) {
      qb.andWhere('s.active = :active', { active: filter.active });
    }
    if (filter.search) {
      qb.andWhere(
        '(s.firstName ILIKE :q OR s.lastName ILIKE :q OR s.registerNo ILIKE :q OR s.mobileno ILIKE :q)',
        { q: `%${filter.search}%` },
      );
    }

    return qb.orderBy('s.id', 'ASC').getMany();
  }

  async findOne(id: number): Promise<Student> {
    const student = await this.studentRepo.findOne({ where: { id } });
    if (!student) throw new NotFoundException('Student not found');
    return student;
  }

  async update(id: number, dto: Partial<CreateStudentDto>): Promise<Student> {
    const student = await this.findOne(id);
    Object.assign(student, dto);
    return this.studentRepo.save(student);
  }

  async remove(id: number): Promise<void> {
    const student = await this.findOne(id);
    await this.studentRepo.remove(student);
  }

  async enroll(dto: CreateEnrollDto): Promise<Enroll> {
    const student = await this.findOne(dto.studentId);
    if (!student) throw new NotFoundException('Student not found');
    const enrollment = this.enrollRepo.create(dto);
    return this.enrollRepo.save(enrollment);
  }

  async getEnrollments(filter: {
    studentId?: number;
    classId?: number;
    sectionId?: number;
    sessionId?: number;
    branchId?: number;
  }): Promise<Enroll[]> {
    const where: any = {};
    if (filter.studentId) where.studentId = filter.studentId;
    if (filter.classId) where.classId = filter.classId;
    if (filter.sectionId) where.sectionId = filter.sectionId;
    if (filter.sessionId) where.sessionId = filter.sessionId;
    if (filter.branchId) where.branchId = filter.branchId;
    return this.enrollRepo.find({ where, relations: ['student'] });
  }

  async findCategories(branchId?: number): Promise<StudentCategory[]> {
    const where = branchId ? { branchId } : {};
    return this.categoryRepo.find({ where });
  }

  async createCategory(
    name: string,
    branchId?: number,
  ): Promise<StudentCategory> {
    return this.categoryRepo.save(this.categoryRepo.create({ name, branchId }));
  }

  async promoteStudent(
    dto: {
      studentId: number;
      fromClassId: number;
      fromSectionId?: number;
      fromSessionId: number;
      toClassId: number;
      toSectionId?: number;
      toSessionId: number;
      branchId?: number;
    },
    promotedBy: number,
  ): Promise<StudentPromotion> {
    const student = await this.findOne(dto.studentId);
    if (!student) throw new NotFoundException('Student not found');
    const promotion = this.promotionRepo.create({ ...dto, promotedBy });
    return this.promotionRepo.save(promotion);
  }

  getPromotionHistory(studentId: number): Promise<StudentPromotion[]> {
    return this.promotionRepo.find({
      where: { studentId },
      order: { promotedAt: 'DESC' },
    });
  }
}
