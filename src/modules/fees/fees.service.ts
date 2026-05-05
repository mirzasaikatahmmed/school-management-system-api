import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from 'nestjs-api-forge';
import { FeesType } from './entities/fees-type.entity';
import { FeeGroup } from './entities/fee-group.entity';
import { FeeAllocation } from './entities/fee-allocation.entity';
import { FeePaymentHistory } from './entities/fee-payment-history.entity';
import {
  CreateFeeAllocationDto,
  CollectPaymentDto,
} from './dto/create-payment.dto';

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
  ) {}

  async getFeeTypes(branchId?: number): Promise<FeesType[]> {
    const where = branchId ? { branchId } : {};
    return this.feesTypeRepo.find({ where });
  }

  async createFeeType(dto: {
    name: string;
    feeCode: string;
    description?: string;
    branchId: number;
  }): Promise<FeesType> {
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

  async createFeeGroup(dto: {
    name: string;
    description?: string;
    sessionId: number;
    branchId: number;
  }): Promise<FeeGroup> {
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
