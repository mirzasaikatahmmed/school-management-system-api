import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('accounts')
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'account_name' })
  accountName: string;

  @Column({ name: 'account_no', nullable: true })
  accountNo: string;

  @Column({ name: 'account_type', nullable: true })
  accountType: string;

  @Column({
    name: 'opening_balance',
    type: 'decimal',
    precision: 15,
    scale: 2,
    default: 0,
  })
  openingBalance: number;

  @Column({
    name: 'current_balance',
    type: 'decimal',
    precision: 15,
    scale: 2,
    default: 0,
  })
  currentBalance: number;

  @Column({ name: 'branch_id', nullable: true })
  branchId: number;

  @Column({ default: true })
  status: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
