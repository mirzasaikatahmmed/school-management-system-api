import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Student } from './student.entity';

@Entity('enroll')
export class Enroll {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'student_id' })
  studentId: number;

  @Column({ name: 'class_id' })
  classId: number;

  @Column({ name: 'section_id' })
  sectionId: number;

  @Column()
  roll: number;

  @Column({ name: 'session_id' })
  sessionId: number;

  @Column({ name: 'default_login', type: 'smallint', default: 0 })
  defaultLogin: number;

  @Column({ name: 'branch_id' })
  branchId: number;

  @Column({ name: 'is_alumni', type: 'smallint', default: 0 })
  isAlumni: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', nullable: true })
  updatedAt: Date;

  @ManyToOne(() => Student)
  @JoinColumn({ name: 'student_id' })
  student: Student;
}
