import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from 'nestjs-api-forge';
import {
  AdvanceSalary,
  AdvanceSalaryStatus,
} from '../student/entities/advance-salary.entity';

@Injectable()
export class AdvanceSalaryService {
  constructor(
    @InjectRepository(AdvanceSalary) private repo: Repository<AdvanceSalary>,
  ) {}

  apply(dto: any, staffId: number) {
    return this.repo.save(this.repo.create({ ...dto, staffId }));
  }

  getAll(filters: { staffId?: number; status?: string; branchId?: number }) {
    const qb = this.repo.createQueryBuilder('a').orderBy('a.createdAt', 'DESC');
    if (filters.staffId)
      qb.andWhere('a.staffId = :staffId', { staffId: filters.staffId });
    if (filters.status)
      qb.andWhere('a.status = :status', { status: filters.status });
    if (filters.branchId)
      qb.andWhere('a.branchId = :branchId', { branchId: filters.branchId });
    return qb.getMany();
  }

  async approve(id: number, approvedBy: number) {
    const a = await this.repo.findOneBy({ id });
    if (!a) throw new NotFoundException('Advance salary request not found');
    return this.repo.save({
      ...a,
      status: AdvanceSalaryStatus.APPROVED,
      approvedBy,
    });
  }

  async reject(id: number, rejectionReason: string, approvedBy: number) {
    const a = await this.repo.findOneBy({ id });
    if (!a) throw new NotFoundException('Advance salary request not found');
    return this.repo.save({
      ...a,
      status: AdvanceSalaryStatus.REJECTED,
      rejectionReason,
      approvedBy,
    });
  }

  async markPaid(id: number, paymentDate: string) {
    const a = await this.repo.findOneBy({ id });
    if (!a) throw new NotFoundException('Advance salary request not found');
    return this.repo.save({
      ...a,
      status: AdvanceSalaryStatus.PAID,
      paymentDate,
    });
  }
}
