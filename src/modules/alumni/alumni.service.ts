import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from 'nestjs-api-forge';
import { Alumni } from './entities/alumni.entity';

@Injectable()
export class AlumniService {
  constructor(
    @InjectRepository(Alumni) private alumniRepo: Repository<Alumni>,
  ) {}

  create(dto: any) {
    return this.alumniRepo.save(this.alumniRepo.create(dto));
  }

  findAll(filters: { passingYear?: number; branchId?: number }) {
    const qb = this.alumniRepo
      .createQueryBuilder('a')
      .orderBy('a.passingYear', 'DESC')
      .addOrderBy('a.fullName');
    if (filters.passingYear)
      qb.andWhere('a.passingYear = :passingYear', {
        passingYear: filters.passingYear,
      });
    if (filters.branchId)
      qb.andWhere('a.branchId = :branchId', { branchId: filters.branchId });
    return qb.getMany();
  }

  async findOne(id: number) {
    const a = await this.alumniRepo.findOneBy({ id });
    if (!a) throw new NotFoundException('Alumni not found');
    return a;
  }

  async update(id: number, dto: any) {
    const a = await this.findOne(id);
    return this.alumniRepo.save({ ...a, ...dto });
  }

  async remove(id: number) {
    const a = await this.findOne(id);
    return this.alumniRepo.remove(a);
  }
}
