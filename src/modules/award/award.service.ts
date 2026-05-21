import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from 'nestjs-api-forge';
import { Award } from './entities/award.entity';
import { CreateAwardDto } from './dto/create-award.dto';

@Injectable()
export class AwardService {
  constructor(@InjectRepository(Award) private awardRepo: Repository<Award>) {}

  create(dto: CreateAwardDto, awardedBy: number) {
    return this.awardRepo.save(this.awardRepo.create({ ...dto, awardedBy }));
  }

  getAll(filters: {
    recipientType?: string;
    recipientId?: number;
    branchId?: number;
    sessionId?: number;
  }) {
    const qb = this.awardRepo
      .createQueryBuilder('a')
      .orderBy('a.awardDate', 'DESC');
    if (filters.recipientType)
      qb.andWhere('a.recipientType = :recipientType', {
        recipientType: filters.recipientType,
      });
    if (filters.recipientId)
      qb.andWhere('a.recipientId = :recipientId', {
        recipientId: filters.recipientId,
      });
    if (filters.branchId)
      qb.andWhere('a.branchId = :branchId', { branchId: filters.branchId });
    if (filters.sessionId)
      qb.andWhere('a.sessionId = :sessionId', { sessionId: filters.sessionId });
    return qb.getMany();
  }

  async update(id: number, dto: Partial<CreateAwardDto>) {
    const a = await this.awardRepo.findOneBy({ id });
    if (!a) throw new NotFoundException('Award not found');
    return this.awardRepo.save({ ...a, ...dto });
  }

  async remove(id: number) {
    const a = await this.awardRepo.findOneBy({ id });
    if (!a) throw new NotFoundException('Award not found');
    return this.awardRepo.remove(a);
  }
}
