import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('visitor_logs')
export class VisitorLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ name: 'to_meet' })
  toMeet: string;

  @Column({ nullable: true })
  purpose: string;

  @Column({ name: 'in_time', nullable: true })
  inTime: string;

  @Column({ name: 'out_time', nullable: true })
  outTime: string;

  @Column({ name: 'id_card_no', nullable: true })
  idCardNo: string;

  @Column({ name: 'visit_date', type: 'date' })
  visitDate: string;

  @Column({ name: 'branch_id', nullable: true })
  branchId: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
