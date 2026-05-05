import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from 'nestjs-api-forge';
import { SchoolClass } from './entities/class.entity';
import { CreateClassDto } from './dto/create-class.dto';
@Injectable()
export class ClassService {
  constructor(
    @InjectRepository(SchoolClass)
    private readonly repo: Repository<SchoolClass>,
  ) {}

  async create(dto: CreateClassDto): Promise<SchoolClass> {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async findAll(branchId?: number): Promise<SchoolClass[]> {
    const where = branchId ? { branchId } : {};
    return this.repo.find({ where, order: { nameNumeric: 'ASC' } });
  }

  async findOne(id: number): Promise<SchoolClass> {
    const entity = await this.repo.findOne({ where: { id } });
    if (!entity) throw new NotFoundException('Class not found');
    return entity;
  }

  async update(id: number, dto: Partial<CreateClassDto>): Promise<SchoolClass> {
    const entity = await this.findOne(id);
    Object.assign(entity, dto);
    return this.repo.save(entity);
  }

  async remove(id: number): Promise<void> {
    const entity = await this.findOne(id);
    await this.repo.remove(entity);
  }
}
