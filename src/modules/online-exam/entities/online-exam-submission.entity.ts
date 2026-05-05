import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('online_exam_submissions')
export class OnlineExamSubmission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'exam_session_id' })
  examSessionId: number;

  @Column({ name: 'student_id' })
  studentId: number;

  @Column({
    name: 'obtained_marks',
    type: 'decimal',
    precision: 8,
    scale: 2,
    default: 0,
  })
  obtainedMarks: number;

  @Column({ name: 'total_questions', default: 0 })
  totalQuestions: number;

  @Column({ name: 'correct_answers', default: 0 })
  correctAnswers: number;

  @Column({ type: 'json', nullable: true })
  answers: Record<string, string>;

  @Column({ name: 'submitted_at', type: 'timestamp', nullable: true })
  submittedAt: Date;

  @Column({ name: 'branch_id', nullable: true })
  branchId: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
