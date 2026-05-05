import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('student_promotions')
export class StudentPromotion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'student_id' })
  studentId: number;

  @Column({ name: 'from_class_id' })
  fromClassId: number;

  @Column({ name: 'from_section_id', nullable: true })
  fromSectionId: number;

  @Column({ name: 'from_session_id' })
  fromSessionId: number;

  @Column({ name: 'to_class_id' })
  toClassId: number;

  @Column({ name: 'to_section_id', nullable: true })
  toSectionId: number;

  @Column({ name: 'to_session_id' })
  toSessionId: number;

  @Column({ name: 'promoted_by' })
  promotedBy: number;

  @Column({ name: 'branch_id', nullable: true })
  branchId: number;

  @CreateDateColumn({ name: 'promoted_at' })
  promotedAt: Date;
}
