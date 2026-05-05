import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('alumni')
export class Alumni {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'student_id', nullable: true })
  studentId: number;

  @Column({ name: 'full_name' })
  fullName: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ name: 'passing_year', nullable: true })
  passingYear: number;

  @Column({ nullable: true })
  occupation: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  photo: string;

  @Column({ name: 'branch_id', nullable: true })
  branchId: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
