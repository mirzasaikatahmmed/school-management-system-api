import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('fee_allocation')
export class FeeAllocation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'student_id' })
  studentId: number;

  @Column({ name: 'group_id' })
  groupId: number;

  @Column({ name: 'branch_id' })
  branchId: number;

  @Column({ name: 'session_id' })
  sessionId: number;

  @Column({
    name: 'prev_due',
    type: 'decimal',
    precision: 18,
    scale: 2,
    default: 0,
  })
  prevDue: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
