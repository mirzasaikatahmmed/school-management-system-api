import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from 'nestjs-api-forge';
import { FeesType } from './entities/fees-type.entity';
import { FeeGroup } from './entities/fee-group.entity';
import { FeeAllocation } from './entities/fee-allocation.entity';
import { FeePaymentHistory } from './entities/fee-payment-history.entity';
import { FeeFine } from './entities/fee-fine.entity';
import {
  CreateFeeAllocationDto,
  CollectPaymentDto,
} from './dto/create-payment.dto';
import { CreateFeeTypeDto } from './dto/create-fee-type.dto';
import { CreateFeeGroupDto } from './dto/create-fee-group.dto';
import { CreateFeeFineDto } from './dto/create-fee-fine.dto';

@Injectable()
export class FeesService {
  constructor(
    @InjectRepository(FeesType)
    private readonly feesTypeRepo: Repository<FeesType>,
    @InjectRepository(FeeGroup)
    private readonly feeGroupRepo: Repository<FeeGroup>,
    @InjectRepository(FeeAllocation)
    private readonly allocationRepo: Repository<FeeAllocation>,
    @InjectRepository(FeePaymentHistory)
    private readonly paymentRepo: Repository<FeePaymentHistory>,
    @InjectRepository(FeeFine)
    private readonly feeFineRepo: Repository<FeeFine>,
  ) {}

  async getFeeTypes(branchId?: number): Promise<FeesType[]> {
    const where = branchId ? { branchId } : {};
    return this.feesTypeRepo.find({ where });
  }

  async createFeeType(dto: CreateFeeTypeDto): Promise<FeesType> {
    return this.feesTypeRepo.save(this.feesTypeRepo.create(dto));
  }

  async getFeeGroups(
    branchId?: number,
    sessionId?: number,
  ): Promise<FeeGroup[]> {
    const where: any = {};
    if (branchId) where.branchId = branchId;
    if (sessionId) where.sessionId = sessionId;
    return this.feeGroupRepo.find({ where });
  }

  async createFeeGroup(dto: CreateFeeGroupDto): Promise<FeeGroup> {
    return this.feeGroupRepo.save(this.feeGroupRepo.create(dto));
  }

  async allocateFee(dto: CreateFeeAllocationDto): Promise<FeeAllocation> {
    return this.allocationRepo.save(this.allocationRepo.create(dto));
  }

  async getAllocation(id: number): Promise<FeeAllocation> {
    const allocation = await this.allocationRepo.findOne({ where: { id } });
    if (!allocation) throw new NotFoundException('Fee allocation not found');
    return allocation;
  }

  async getStudentAllocations(
    studentId: number,
    sessionId?: number,
  ): Promise<FeeAllocation[]> {
    const where: any = { studentId };
    if (sessionId) where.sessionId = sessionId;
    return this.allocationRepo.find({ where });
  }

  async collectPayment(
    dto: CollectPaymentDto,
    userId: number,
  ): Promise<FeePaymentHistory> {
    await this.getAllocation(dto.allocationId);
    const payment = this.paymentRepo.create({
      ...dto,
      collectBy: String(userId),
    });
    return this.paymentRepo.save(payment);
  }

  async getPaymentHistory(allocationId: number): Promise<FeePaymentHistory[]> {
    return this.paymentRepo.find({
      where: { allocationId },
      order: { date: 'DESC' },
    });
  }

  // Fee Fines
  createFeeFine(dto: CreateFeeFineDto): Promise<FeeFine> {
    return this.feeFineRepo.save(this.feeFineRepo.create(dto));
  }

  getFeeFines(filters: { groupId?: number; sessionId?: number; branchId?: number }): Promise<FeeFine[]> {
    const where: any = {};
    if (filters.groupId) where.groupId = filters.groupId;
    if (filters.sessionId) where.sessionId = filters.sessionId;
    if (filters.branchId) where.branchId = filters.branchId;
    return this.feeFineRepo.find({ where });
  }

  async removeFeeFine(id: number): Promise<void> {
    const fine = await this.feeFineRepo.findOneBy({ id });
    if (!fine) throw new NotFoundException('Fee fine not found');
    await this.feeFineRepo.remove(fine);
  }

  async getStudentFeeStatement(
    studentId: number,
    sessionId: number,
  ): Promise<{
    allocations: FeeAllocation[];
    payments: FeePaymentHistory[];
    totalPaid: number;
    totalDue: number;
  }> {
    const allocations = await this.getStudentAllocations(studentId, sessionId);
    const allPayments: FeePaymentHistory[] = [];

    for (const alloc of allocations) {
      const payments = await this.getPaymentHistory(alloc.id);
      allPayments.push(...payments);
    }

    const totalPaid = allPayments.reduce((sum, p) => sum + Number(p.amount), 0);
    const totalDue = allocations.reduce((sum, a) => sum + Number(a.prevDue), 0);

    return { allocations, payments: allPayments, totalPaid, totalDue };
  }
}
