import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('homework_submissions')
export class HomeworkSubmission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'homework_id' })
  homeworkId: number;

  @Column({ name: 'student_id' })
  studentId: number;

  @Column({ type: 'text', nullable: true })
  content: string;

  @Column({ name: 'file_path', nullable: true })
  filePath: string;

  @Column({
    name: 'obtained_marks',
    nullable: true,
    type: 'decimal',
    precision: 8,
    scale: 2,
  })
  obtainedMarks: number;

  @Column({ nullable: true })
  feedback: string;

  @Column({ name: 'evaluated_by', nullable: true })
  evaluatedBy: number;

  @Column({ default: false })
  evaluated: boolean;

  @CreateDateColumn({ name: 'submitted_at' })
  submittedAt: Date;
}
