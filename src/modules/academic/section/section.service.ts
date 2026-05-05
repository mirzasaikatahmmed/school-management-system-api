import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from 'nestjs-api-forge';
import { Section } from './entities/section.entity';
import { CreateSectionDto } from './dto/create-section.dto';

@Injectable()
export class SectionService {
  constructor(
    @InjectRepository(Section)
    private readonly repo: Repository<Section>,
  ) {}

  async create(dto: CreateSectionDto): Promise<Section> {
    return this.repo.save(this.repo.create(dto));
  }

  async findAll(branchId?: number): Promise<Section[]> {
    const where = branchId ? { branchId } : {};
    return this.repo.find({ where, order: { name: 'ASC' } });
  }

  async findOne(id: number): Promise<Section> {
    const entity = await this.repo.findOne({ where: { id } });
    if (!entity) throw new NotFoundException('Section not found');
    return entity;
  }

  async update(id: number, dto: Partial<CreateSectionDto>): Promise<Section> {
    const entity = await this.findOne(id);
    Object.assign(entity, dto);
    return this.repo.save(entity);
  }

  async remove(id: number): Promise<void> {
    const entity = await this.findOne(id);
    await this.repo.remove(entity);
  }
}
