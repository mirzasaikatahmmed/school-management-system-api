import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from 'nestjs-api-forge';
import { SchoolYear } from './entities/school-year.entity';
import { CreateSchoolYearDto } from './dto/create-school-year.dto';

@Injectable()
export class SchoolYearService {
  constructor(
    @InjectRepository(SchoolYear)
    private readonly repo: Repository<SchoolYear>,
  ) {}

  async create(dto: CreateSchoolYearDto, userId: number): Promise<SchoolYear> {
    const entity = this.repo.create({ ...dto, createdBy: userId });
    return this.repo.save(entity);
  }

  async findAll(): Promise<SchoolYear[]> {
    return this.repo.find({ order: { schoolYear: 'DESC' } });
  }

  async findOne(id: number): Promise<SchoolYear> {
    const entity = await this.repo.findOne({ where: { id } });
    if (!entity) throw new NotFoundException('School year not found');
    return entity;
  }

  async remove(id: number): Promise<void> {
    const entity = await this.findOne(id);
    await this.repo.remove(entity);
  }
}
