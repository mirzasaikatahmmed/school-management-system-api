import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum AttendanceStatus {
  PRESENT = 'P',
  ABSENT = 'A',
  HOLIDAY = 'H',
  LATE = 'L',
}

@Entity('student_attendance')
export class StudentAttendance {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'enroll_id' })
  enrollId: number;

  @Column({ type: 'date' })
  date: string;

  @Column({ type: 'varchar', length: 4, nullable: true })
  status: AttendanceStatus;

  @Column({ type: 'text', nullable: true })
  remark: string;

  @Column({ name: 'branch_id', nullable: true })
  branchId: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', nullable: true })
  updatedAt: Date;
}
