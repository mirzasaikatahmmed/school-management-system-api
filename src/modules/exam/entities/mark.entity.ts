import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('mark')
export class Mark {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'student_id' })
  studentId: number;

  @Column({ name: 'subject_id' })
  subjectId: number;

  @Column({ name: 'class_id' })
  classId: number;

  @Column({ name: 'section_id' })
  sectionId: number;

  @Column({ name: 'exam_id' })
  examId: number;

  @Column({ type: 'text', nullable: true })
  mark: string;

  @Column({ length: 4, nullable: true })
  absent: string;

  @Column({ name: 'session_id' })
  sessionId: number;

  @Column({ name: 'branch_id', nullable: true })
  branchId: number;
}
