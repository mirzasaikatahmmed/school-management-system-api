import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from 'nestjs-api-forge';
import { VisitorLog } from './entities/visitor-log.entity';
import { PostalRecord } from './entities/postal-record.entity';
import { Complaint } from './entities/complaint.entity';
import { CallLog } from './entities/call-log.entity';
import { Enquiry } from './entities/enquiry.entity';
import { CreateVisitorDto } from './dto/create-visitor.dto';
import { CreatePostalDto } from './dto/create-postal.dto';
import { CreateComplaintDto } from './dto/create-complaint.dto';
import { CreateCallLogDto } from './dto/create-call-log.dto';
import { CreateEnquiryDto } from './dto/create-enquiry.dto';

@Injectable()
export class ReceptionService {
  constructor(
    @InjectRepository(VisitorLog) private visitorRepo: Repository<VisitorLog>,
    @InjectRepository(PostalRecord)
    private postalRepo: Repository<PostalRecord>,
    @InjectRepository(Complaint) private complaintRepo: Repository<Complaint>,
    @InjectRepository(CallLog) private callLogRepo: Repository<CallLog>,
    @InjectRepository(Enquiry) private enquiryRepo: Repository<Enquiry>,
  ) {}

  // Visitors
  createVisitor(dto: CreateVisitorDto) {
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

  async updateVisitor(id: number, dto: Partial<CreateVisitorDto>) {
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
  createPostal(dto: CreatePostalDto) {
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
  createComplaint(dto: CreateComplaintDto) {
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

  async updateComplaint(id: number, dto: Partial<CreateComplaintDto>) {
    const c = await this.complaintRepo.findOneBy({ id });
    if (!c) throw new NotFoundException('Complaint not found');
    return this.complaintRepo.save({ ...c, ...dto });
  }

  // Call Logs
  createCallLog(dto: CreateCallLogDto, createdBy: number) {
    return this.callLogRepo.save(this.callLogRepo.create({ ...dto, createdBy }));
  }

  getCallLogs(filters: { callType?: string; branchId?: number; fromDate?: string; toDate?: string }) {
    const qb = this.callLogRepo.createQueryBuilder('c').orderBy('c.date', 'DESC');
    if (filters.callType) qb.andWhere('c.callType = :callType', { callType: filters.callType });
    if (filters.branchId) qb.andWhere('c.branchId = :branchId', { branchId: filters.branchId });
    if (filters.fromDate) qb.andWhere('c.date >= :fromDate', { fromDate: filters.fromDate });
    if (filters.toDate) qb.andWhere('c.date <= :toDate', { toDate: filters.toDate });
    return qb.getMany();
  }

  async updateCallLog(id: number, dto: Partial<CreateCallLogDto>) {
    const log = await this.callLogRepo.findOneBy({ id });
    if (!log) throw new NotFoundException('Call log not found');
    return this.callLogRepo.save({ ...log, ...dto });
  }

  async removeCallLog(id: number) {
    const log = await this.callLogRepo.findOneBy({ id });
    if (!log) throw new NotFoundException('Call log not found');
    return this.callLogRepo.remove(log);
  }

  // Enquiries
  createEnquiry(dto: CreateEnquiryDto, createdBy: number) {
    return this.enquiryRepo.save(this.enquiryRepo.create({ ...dto, createdBy }));
  }

  getEnquiries(filters: { status?: string; classId?: number; branchId?: number }) {
    const qb = this.enquiryRepo.createQueryBuilder('e').orderBy('e.date', 'DESC');
    if (filters.status) qb.andWhere('e.status = :status', { status: filters.status });
    if (filters.classId) qb.andWhere('e.classId = :classId', { classId: filters.classId });
    if (filters.branchId) qb.andWhere('e.branchId = :branchId', { branchId: filters.branchId });
    return qb.getMany();
  }

  async findEnquiry(id: number) {
    const e = await this.enquiryRepo.findOneBy({ id });
    if (!e) throw new NotFoundException('Enquiry not found');
    return e;
  }

  async updateEnquiry(id: number, dto: Partial<CreateEnquiryDto>) {
    const e = await this.findEnquiry(id);
    return this.enquiryRepo.save({ ...e, ...dto });
  }

  async removeEnquiry(id: number) {
    const e = await this.findEnquiry(id);
    return this.enquiryRepo.remove(e);
  }
}
