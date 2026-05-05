import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from 'nestjs-api-forge';
import { SalaryTemplate } from './entities/salary-template.entity';
import { SalaryTemplateDetail } from './entities/salary-template-detail.entity';
import { Payroll } from './entities/payroll.entity';

@Injectable()
export class PayrollService {
  constructor(
    @InjectRepository(SalaryTemplate)
    private templateRepo: Repository<SalaryTemplate>,
    @InjectRepository(SalaryTemplateDetail)
    private detailRepo: Repository<SalaryTemplateDetail>,
    @InjectRepository(Payroll) private payrollRepo: Repository<Payroll>,
  ) {}

  // Salary Templates
  createTemplate(dto: any) {
    return this.templateRepo.save(this.templateRepo.create(dto));
  }

  getTemplates(branchId?: number) {
    return this.templateRepo.find({ where: branchId ? { branchId } : {} });
  }

  async updateTemplate(id: number, dto: any) {
    const t = await this.templateRepo.findOneBy({ id });
    if (!t) throw new NotFoundException('Template not found');
    return this.templateRepo.save({ ...t, ...dto });
  }

  async removeTemplate(id: number) {
    const t = await this.templateRepo.findOneBy({ id });
    if (!t) throw new NotFoundException('Template not found');
    return this.templateRepo.remove(t);
  }

  // Template Details
  addTemplateDetail(dto: any) {
    return this.detailRepo.save(this.detailRepo.create(dto));
  }

  getTemplateDetails(templateId: number) {
    return this.detailRepo.find({ where: { templateId } });
  }

  async removeTemplateDetail(id: number) {
    const d = await this.detailRepo.findOneBy({ id });
    if (!d) throw new NotFoundException('Template detail not found');
    return this.detailRepo.remove(d);
  }

  // Payroll
  async generatePayroll(dto: any) {
    const existing = await this.payrollRepo.findOne({
      where: { staffId: dto.staffId, month: dto.month, year: dto.year },
    });
    if (existing) return this.payrollRepo.save({ ...existing, ...dto });
    return this.payrollRepo.save(this.payrollRepo.create(dto));
  }

  getPayrolls(filters: {
    staffId?: number;
    month?: number;
    year?: number;
    branchId?: number;
    sessionId?: number;
  }) {
    const qb = this.payrollRepo
      .createQueryBuilder('p')
      .orderBy('p.year', 'DESC')
      .addOrderBy('p.month', 'DESC');
    if (filters.staffId)
      qb.andWhere('p.staffId = :staffId', { staffId: filters.staffId });
    if (filters.month)
      qb.andWhere('p.month = :month', { month: filters.month });
    if (filters.year) qb.andWhere('p.year = :year', { year: filters.year });
    if (filters.branchId)
      qb.andWhere('p.branchId = :branchId', { branchId: filters.branchId });
    if (filters.sessionId)
      qb.andWhere('p.sessionId = :sessionId', { sessionId: filters.sessionId });
    return qb.getMany();
  }

  async payPayroll(id: number, dto: any) {
    const payroll = await this.payrollRepo.findOneBy({ id });
    if (!payroll) throw new NotFoundException('Payroll record not found');
    return this.payrollRepo.save({
      ...payroll,
      paymentStatus: 'paid',
      paymentDate: dto.paymentDate,
      accountId: dto.accountId,
    });
  }
}
