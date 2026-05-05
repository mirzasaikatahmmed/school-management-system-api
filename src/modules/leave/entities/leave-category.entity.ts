import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('leave_categories')
export class LeaveCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ name: 'total_days', default: 0 })
  totalDays: number;

  @Column({ name: 'branch_id', nullable: true })
  branchId: number;
}
