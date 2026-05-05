import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from 'nestjs-api-forge';
import { Subject } from './entities/subject.entity';
import { CreateSubjectDto } from './dto/create-subject.dto';

@Injectable()
export class SubjectService {
  constructor(
    @InjectRepository(Subject)
    private readonly repo: Repository<Subject>,
  ) {}

  async create(dto: CreateSubjectDto): Promise<Subject> {
    return this.repo.save(this.repo.create(dto));
  }

  async findAll(branchId?: number): Promise<Subject[]> {
    const where = branchId ? { branchId } : {};
    return this.repo.find({ where, order: { name: 'ASC' } });
  }

  async findOne(id: number): Promise<Subject> {
    const entity = await this.repo.findOne({ where: { id } });
    if (!entity) throw new NotFoundException('Subject not found');
    return entity;
  }

  async update(id: number, dto: Partial<CreateSubjectDto>): Promise<Subject> {
    const entity = await this.findOne(id);
    Object.assign(entity, dto);
    return this.repo.save(entity);
  }

  async remove(id: number): Promise<void> {
    const entity = await this.findOne(id);
    await this.repo.remove(entity);
  }
}
