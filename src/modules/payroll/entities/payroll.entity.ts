import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('payrolls')
export class Payroll {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'staff_id' })
  staffId: number;

  @Column({ name: 'month' })
  month: number;

  @Column({ name: 'year' })
  year: number;

  @Column({ name: 'basic_salary', type: 'decimal', precision: 12, scale: 2 })
  basicSalary: number;

  @Column({
    name: 'total_allowance',
    type: 'decimal',
    precision: 12,
    scale: 2,
    default: 0,
  })
  totalAllowance: number;

  @Column({
    name: 'total_deduction',
    type: 'decimal',
    precision: 12,
    scale: 2,
    default: 0,
  })
  totalDeduction: number;

  @Column({ name: 'net_salary', type: 'decimal', precision: 12, scale: 2 })
  netSalary: number;

  @Column({ name: 'payment_status', default: 'unpaid' })
  paymentStatus: string;

  @Column({ name: 'payment_date', nullable: true, type: 'date' })
  paymentDate: string;

  @Column({ name: 'account_id', nullable: true })
  accountId: number;

  @Column({ name: 'branch_id', nullable: true })
  branchId: number;

  @Column({ name: 'session_id', nullable: true })
  sessionId: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
