import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

export enum FineType {
  FIXED = 'fixed',
  PERCENTAGE = 'percentage',
}

@Entity('fee_fine')
export class FeeFine {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'group_id' })
  groupId: number;

  @Column({ name: 'type_id' })
  typeId: number;

  @Column({ name: 'fine_type', type: 'enum', enum: FineType, default: FineType.FIXED })
  fineType: FineType;

  @Column({ name: 'fine_value', type: 'decimal', precision: 18, scale: 2 })
  fineValue: number;

  @Column({ name: 'fee_frequency', default: 0 })
  feeFrequency: number;

  @Column({ name: 'due_date', type: 'date', nullable: true })
  dueDate: string;

  @Column({ name: 'session_id', nullable: true })
  sessionId: number;

  @Column({ name: 'branch_id', nullable: true })
  branchId: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
