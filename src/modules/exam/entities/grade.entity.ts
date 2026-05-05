import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('grade')
export class Grade {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ name: 'grade_point' })
  gradePoint: string;

  @Column({ name: 'lower_mark' })
  lowerMark: number;

  @Column({ name: 'upper_mark' })
  upperMark: number;

  @Column({ type: 'text', nullable: true })
  remark: string;

  @Column({ name: 'branch_id', nullable: true })
  branchId: number;
}
