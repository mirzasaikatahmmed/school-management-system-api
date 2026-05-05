import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

export enum AwardRecipientType {
  STUDENT = 'student',
  STAFF = 'staff',
}

@Entity('awards')
export class Award {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ name: 'recipient_type', type: 'enum', enum: AwardRecipientType })
  recipientType: AwardRecipientType;

  @Column({ name: 'recipient_id' })
  recipientId: number;

  @Column({ nullable: true })
  description: string;

  @Column({ name: 'award_date', type: 'date' })
  awardDate: string;

  @Column({ name: 'awarded_by', nullable: true })
  awardedBy: number;

  @Column({ name: 'branch_id', nullable: true })
  branchId: number;

  @Column({ name: 'session_id', nullable: true })
  sessionId: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
