import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

export enum AdvanceSalaryStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  PAID = 'paid',
}

@Entity('advance_salaries')
export class AdvanceSalary {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'staff_id' })
  staffId: number;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  amount: number;

  @Column({ nullable: true })
  reason: string;

  @Column({
    type: 'enum',
    enum: AdvanceSalaryStatus,
    default: AdvanceSalaryStatus.PENDING,
  })
  status: AdvanceSalaryStatus;

  @Column({ name: 'approved_by', nullable: true })
  approvedBy: number;

  @Column({ name: 'rejection_reason', nullable: true })
  rejectionReason: string;

  @Column({ name: 'payment_date', nullable: true, type: 'date' })
  paymentDate: string;

  @Column({ name: 'branch_id', nullable: true })
  branchId: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
