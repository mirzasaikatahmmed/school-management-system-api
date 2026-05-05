import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('homeworks')
export class Homework {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'class_id' })
  classId: number;

  @Column({ name: 'section_id', nullable: true })
  sectionId: number;

  @Column({ name: 'subject_id' })
  subjectId: number;

  @Column({ name: 'teacher_id' })
  teacherId: number;

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ name: 'submission_date', type: 'date' })
  submissionDate: string;

  @Column({ name: 'max_marks', nullable: true })
  maxMarks: number;

  @Column({ name: 'branch_id', nullable: true })
  branchId: number;

  @Column({ name: 'session_id', nullable: true })
  sessionId: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
