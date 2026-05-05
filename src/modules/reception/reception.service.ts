import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from 'nestjs-api-forge';
import { VisitorLog } from './entities/visitor-log.entity';
import { PostalRecord } from './entities/postal-record.entity';
import { Complaint } from './entities/complaint.entity';

@Injectable()
export class ReceptionService {
  constructor(
    @InjectRepository(VisitorLog) private visitorRepo: Repository<VisitorLog>,
    @InjectRepository(PostalRecord)
    private postalRepo: Repository<PostalRecord>,
    @InjectRepository(Complaint) private complaintRepo: Repository<Complaint>,
  ) {}

  // Visitors
  createVisitor(dto: any) {
    return this.visitorRepo.save(this.visitorRepo.create(dto));
  }

  getVisitors(filters: {
    branchId?: number;
    fromDate?: string;
    toDate?: string;
  }) {
    const qb = this.visitorRepo
      .createQueryBuilder('v')
      .orderBy('v.visitDate', 'DESC');
    if (filters.branchId)
      qb.andWhere('v.branchId = :branchId', { branchId: filters.branchId });
    if (filters.fromDate)
      qb.andWhere('v.visitDate >= :fromDate', { fromDate: filters.fromDate });
    if (filters.toDate)
      qb.andWhere('v.visitDate <= :toDate', { toDate: filters.toDate });
    return qb.getMany();
  }

  async updateVisitor(id: number, dto: any) {
    const v = await this.visitorRepo.findOneBy({ id });
    if (!v) throw new NotFoundException('Visitor log not found');
    return this.visitorRepo.save({ ...v, ...dto });
  }

  async removeVisitor(id: number) {
    const v = await this.visitorRepo.findOneBy({ id });
    if (!v) throw new NotFoundException('Visitor log not found');
    return this.visitorRepo.remove(v);
  }

  // Postal Records
  createPostal(dto: any) {
    return this.postalRepo.save(this.postalRepo.create(dto));
  }

  getPostals(filters: { type?: string; branchId?: number }) {
    const qb = this.postalRepo
      .createQueryBuilder('p')
      .orderBy('p.postalDate', 'DESC');
    if (filters.type) qb.andWhere('p.type = :type', { type: filters.type });
    if (filters.branchId)
      qb.andWhere('p.branchId = :branchId', { branchId: filters.branchId });
    return qb.getMany();
  }

  async removePostal(id: number) {
    const p = await this.postalRepo.findOneBy({ id });
    if (!p) throw new NotFoundException('Postal record not found');
    return this.postalRepo.remove(p);
  }

  // Complaints
  createComplaint(dto: any) {
    return this.complaintRepo.save(this.complaintRepo.create(dto));
  }

  getComplaints(filters: { status?: string; branchId?: number }) {
    const qb = this.complaintRepo
      .createQueryBuilder('c')
      .orderBy('c.complaintDate', 'DESC');
    if (filters.status)
      qb.andWhere('c.status = :status', { status: filters.status });
    if (filters.branchId)
      qb.andWhere('c.branchId = :branchId', { branchId: filters.branchId });
    return qb.getMany();
  }

  async updateComplaint(id: number, dto: any) {
    const c = await this.complaintRepo.findOneBy({ id });
    if (!c) throw new NotFoundException('Complaint not found');
    return this.complaintRepo.save({ ...c, ...dto });
  }
}
