import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('online_exam_questions')
export class OnlineExamQuestion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'group_id', nullable: true })
  groupId: number;

  @Column({ name: 'subject_id', nullable: true })
  subjectId: number;

  @Column({ type: 'text' })
  question: string;

  @Column({ name: 'option_a' })
  optionA: string;

  @Column({ name: 'option_b' })
  optionB: string;

  @Column({ name: 'option_c', nullable: true })
  optionC: string;

  @Column({ name: 'option_d', nullable: true })
  optionD: string;

  @Column({ name: 'correct_answer' })
  correctAnswer: string;

  @Column({ nullable: true })
  explanation: string;

  @Column({ name: 'branch_id', nullable: true })
  branchId: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
