import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('hostel_allocations')
export class HostelAllocation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'student_id' })
  studentId: number;

  @Column({ name: 'hostel_id' })
  hostelId: number;

  @Column({ name: 'room_id' })
  roomId: number;

  @Column({ name: 'from_date', type: 'date' })
  fromDate: string;

  @Column({ name: 'to_date', nullable: true, type: 'date' })
  toDate: string;

  @Column({ name: 'session_id', nullable: true })
  sessionId: number;

  @Column({ name: 'branch_id', nullable: true })
  branchId: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
