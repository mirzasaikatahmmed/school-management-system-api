import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from 'nestjs-api-forge';
import { Parent } from './entities/parent.entity';
import { CreateParentDto } from './dto/create-parent.dto';

@Injectable()
export class ParentsService {
  constructor(
    @InjectRepository(Parent) private parentRepo: Repository<Parent>,
  ) {}

  create(dto: CreateParentDto) {
    return this.parentRepo.save(this.parentRepo.create(dto));
  }

  findAll(branchId?: number) {
    return this.parentRepo.find({
      where: branchId ? { branchId } : {},
      order: { fullName: 'ASC' },
    });
  }

  async findOne(id: number) {
    const parent = await this.parentRepo.findOneBy({ id });
    if (!parent) throw new NotFoundException('Parent not found');
    return parent;
  }

  async update(id: number, dto: Partial<CreateParentDto>) {
    const parent = await this.findOne(id);
    return this.parentRepo.save({ ...parent, ...dto });
  }

  async remove(id: number) {
    const parent = await this.findOne(id);
    return this.parentRepo.remove(parent);
  }
}
