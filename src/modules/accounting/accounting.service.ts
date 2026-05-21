import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from 'nestjs-api-forge';
import { Account } from './entities/account.entity';
import { VoucherHead } from './entities/voucher-head.entity';
import { Transaction, TransactionType } from './entities/transaction.entity';
import { CreateAccountDto } from './dto/create-account.dto';
import { CreateVoucherHeadDto } from './dto/create-voucher-head.dto';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@Injectable()
export class AccountingService {
  constructor(
    @InjectRepository(Account) private accountRepo: Repository<Account>,
    @InjectRepository(VoucherHead)
    private voucherHeadRepo: Repository<VoucherHead>,
    @InjectRepository(Transaction)
    private transactionRepo: Repository<Transaction>,
  ) {}

  // Accounts
  createAccount(dto: CreateAccountDto) {
    return this.accountRepo.save(this.accountRepo.create(dto));
  }

  getAccounts(branchId?: number) {
    return this.accountRepo.find({
      where: branchId ? { branchId } : {},
      order: { accountName: 'ASC' },
    });
  }

  async updateAccount(id: number, dto: Partial<CreateAccountDto>) {
    const account = await this.accountRepo.findOneBy({ id });
    if (!account) throw new NotFoundException('Account not found');
    return this.accountRepo.save({ ...account, ...dto });
  }

  async removeAccount(id: number) {
    const account = await this.accountRepo.findOneBy({ id });
    if (!account) throw new NotFoundException('Account not found');
    return this.accountRepo.remove(account);
  }

  // Voucher Heads
  createVoucherHead(dto: CreateVoucherHeadDto) {
    return this.voucherHeadRepo.save(this.voucherHeadRepo.create(dto));
  }

  getVoucherHeads(branchId?: number) {
    return this.voucherHeadRepo.find({ where: branchId ? { branchId } : {} });
  }

  async updateVoucherHead(id: number, dto: Partial<CreateVoucherHeadDto>) {
    const head = await this.voucherHeadRepo.findOneBy({ id });
    if (!head) throw new NotFoundException('Voucher head not found');
    return this.voucherHeadRepo.save({ ...head, ...dto });
  }

  async removeVoucherHead(id: number) {
    const head = await this.voucherHeadRepo.findOneBy({ id });
    if (!head) throw new NotFoundException('Voucher head not found');
    return this.voucherHeadRepo.remove(head);
  }

  // Transactions
  async createTransaction(dto: CreateTransactionDto, createdBy: number) {
    const account = await this.accountRepo.findOneBy({ id: dto.accountId });
    if (!account) throw new NotFoundException('Account not found');

    const transaction = this.transactionRepo.create({ ...dto, createdBy });
    const saved = await this.transactionRepo.save(transaction);

    // Update account balance
    if (dto.transactionType === TransactionType.CREDIT) {
      account.currentBalance =
        Number(account.currentBalance) + Number(dto.amount);
    } else {
      account.currentBalance =
        Number(account.currentBalance) - Number(dto.amount);
    }
    await this.accountRepo.save(account);

    return saved;
  }

  getTransactions(filters: {
    accountId?: number;
    branchId?: number;
    sessionId?: number;
    fromDate?: string;
    toDate?: string;
  }) {
    const qb = this.transactionRepo
      .createQueryBuilder('t')
      .orderBy('t.transactionDate', 'DESC');

    if (filters.accountId)
      qb.andWhere('t.accountId = :accountId', { accountId: filters.accountId });
    if (filters.branchId)
      qb.andWhere('t.branchId = :branchId', { branchId: filters.branchId });
    if (filters.sessionId)
      qb.andWhere('t.sessionId = :sessionId', { sessionId: filters.sessionId });
    if (filters.fromDate)
      qb.andWhere('t.transactionDate >= :fromDate', {
        fromDate: filters.fromDate,
      });
    if (filters.toDate)
      qb.andWhere('t.transactionDate <= :toDate', { toDate: filters.toDate });

    return qb.getMany();
  }

  async getBalanceSheet(branchId?: number) {
    const accounts = await this.accountRepo.find({
      where: branchId ? { branchId } : {},
      order: { accountName: 'ASC' },
    });
    const totalBalance = accounts.reduce(
      (sum, a) => sum + Number(a.currentBalance),
      0,
    );
    return { accounts, totalBalance };
  }

  async getIncomeExpenseReport(filters: {
    branchId?: number;
    sessionId?: number;
    fromDate?: string;
    toDate?: string;
  }) {
    const transactions = await this.getTransactions(filters);
    const income = transactions
      .filter((t) => t.transactionType === TransactionType.CREDIT)
      .reduce((sum, t) => sum + Number(t.amount), 0);
    const expense = transactions
      .filter((t) => t.transactionType === TransactionType.DEBIT)
      .reduce((sum, t) => sum + Number(t.amount), 0);
    return { income, expense, net: income - expense, transactions };
  }
}
