import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from 'nestjs-api-forge';
import { LeaveCategory } from './entities/leave-category.entity';
import {
  LeaveApplication,
  LeaveStatus,
} from './entities/leave-application.entity';

@Injectable()
export class LeaveService {
  constructor(
    @InjectRepository(LeaveCategory)
    private categoryRepo: Repository<LeaveCategory>,
    @InjectRepository(LeaveApplication)
    private applicationRepo: Repository<LeaveApplication>,
  ) {}

  createCategory(dto: any) {
    return this.categoryRepo.save(this.categoryRepo.create(dto));
  }

  getCategories(branchId?: number) {
    return this.categoryRepo.find({ where: branchId ? { branchId } : {} });
  }

  async updateCategory(id: number, dto: any) {
    const cat = await this.categoryRepo.findOneBy({ id });
    if (!cat) throw new NotFoundException('Leave category not found');
    return this.categoryRepo.save({ ...cat, ...dto });
  }

  async removeCategory(id: number) {
    const cat = await this.categoryRepo.findOneBy({ id });
    if (!cat) throw new NotFoundException('Leave category not found');
    return this.categoryRepo.remove(cat);
  }

  applyLeave(dto: any, staffId: number) {
    return this.applicationRepo.save(
      this.applicationRepo.create({ ...dto, staffId }),
    );
  }

  getApplications(filters: {
    staffId?: number;
    status?: string;
    branchId?: number;
  }) {
    const qb = this.applicationRepo
      .createQueryBuilder('la')
      .orderBy('la.createdAt', 'DESC');
    if (filters.staffId)
      qb.andWhere('la.staffId = :staffId', { staffId: filters.staffId });
    if (filters.status)
      qb.andWhere('la.status = :status', { status: filters.status });
    if (filters.branchId)
      qb.andWhere('la.branchId = :branchId', { branchId: filters.branchId });
    return qb.getMany();
  }

  async approveLeave(id: number, approvedBy: number) {
    const app = await this.applicationRepo.findOneBy({ id });
    if (!app) throw new NotFoundException('Leave application not found');
    return this.applicationRepo.save({
      ...app,
      status: LeaveStatus.APPROVED,
      approvedBy,
    });
  }

  async rejectLeave(id: number, rejectionReason: string, approvedBy: number) {
    const app = await this.applicationRepo.findOneBy({ id });
    if (!app) throw new NotFoundException('Leave application not found');
    return this.applicationRepo.save({
      ...app,
      status: LeaveStatus.REJECTED,
      rejectionReason,
      approvedBy,
    });
  }
}
