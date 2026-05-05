import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('complaints')
export class Complaint {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  complainant: string;

  @Column({ nullable: true })
  phone: string;

  @Column()
  subject: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ nullable: true })
  action: string;

  @Column({ name: 'complaint_date', type: 'date' })
  complaintDate: string;

  @Column({ default: 'open' })
  status: string;

  @Column({ name: 'branch_id', nullable: true })
  branchId: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
