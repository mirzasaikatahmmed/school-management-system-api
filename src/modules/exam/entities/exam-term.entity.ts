import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('exam_term')
export class ExamTerm {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  name: string;

  @Column({ name: 'branch_id', nullable: true })
  branchId: number;

  @Column({ name: 'session_id' })
  sessionId: number;
}
