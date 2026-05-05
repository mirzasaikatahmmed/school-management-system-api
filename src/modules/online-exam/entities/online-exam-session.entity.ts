import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('online_exam_sessions')
export class OnlineExamSession {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ name: 'class_id' })
  classId: number;

  @Column({ name: 'subject_id', nullable: true })
  subjectId: number;

  @Column({ name: 'exam_date', type: 'date' })
  examDate: string;

  @Column({ name: 'start_time' })
  startTime: string;

  @Column({ name: 'end_time' })
  endTime: string;

  @Column({ name: 'duration_minutes', default: 60 })
  durationMinutes: number;

  @Column({ name: 'total_marks', default: 100 })
  totalMarks: number;

  @Column({ name: 'pass_marks', default: 33 })
  passMarks: number;

  @Column({ default: true })
  status: boolean;

  @Column({ name: 'branch_id', nullable: true })
  branchId: number;

  @Column({ name: 'session_id', nullable: true })
  sessionId: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
