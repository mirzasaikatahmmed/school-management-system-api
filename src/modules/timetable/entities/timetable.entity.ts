import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('timetables')
export class Timetable {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'class_id' })
  classId: number;

  @Column({ name: 'section_id', nullable: true })
  sectionId: number;

  @Column({ name: 'subject_id' })
  subjectId: number;

  @Column({ name: 'teacher_id', nullable: true })
  teacherId: number;

  @Column({ name: 'day_of_week' })
  dayOfWeek: number;

  @Column({ name: 'start_time' })
  startTime: string;

  @Column({ name: 'end_time' })
  endTime: string;

  @Column({ name: 'room_no', nullable: true })
  roomNo: string;

  @Column({ name: 'branch_id', nullable: true })
  branchId: number;

  @Column({ name: 'session_id', nullable: true })
  sessionId: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
