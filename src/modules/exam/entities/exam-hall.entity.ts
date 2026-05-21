import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('exam_hall')
export class ExamHall {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'hall_no' })
  hallNo: string;

  @Column({ type: 'int' })
  seats: number;

  @Column({ name: 'branch_id', nullable: true })
  branchId: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
