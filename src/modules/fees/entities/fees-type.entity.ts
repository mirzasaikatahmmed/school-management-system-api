import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('fees_type')
export class FeesType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ name: 'fee_code' })
  feeCode: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ name: 'branch_id', default: 0 })
  branchId: number;

  @Column({ type: 'smallint', default: 0 })
  system: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
