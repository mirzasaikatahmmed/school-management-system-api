import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('staff_attendance')
export class StaffAttendance {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'staff_id' })
  staffId: number;

  @Column({ nullable: true })
  status: string;

  @Column({ nullable: true })
  remark: string;

  @Column({ type: 'date', nullable: true })
  date: string;

  @Column({ name: 'branch_id', nullable: true })
  branchId: number;
}
