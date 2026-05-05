import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('fee_groups')
export class FeeGroup {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ name: 'session_id' })
  sessionId: number;

  @Column({ type: 'smallint', default: 0 })
  system: number;

  @Column({ name: 'branch_id' })
  branchId: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
