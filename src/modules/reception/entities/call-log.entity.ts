import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum CallType {
  OUTGOING = 'outgoing',
  INCOMING = 'incoming',
}

@Entity('call_log')
export class CallLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  number: string;

  @Column({ name: 'purpose_id', nullable: true })
  purposeId: number;

  @Column({ name: 'call_type', type: 'enum', enum: CallType })
  callType: CallType;

  @Column({ type: 'date' })
  date: string;

  @Column({ name: 'start_time', nullable: true })
  startTime: string;

  @Column({ name: 'end_time', nullable: true })
  endTime: string;

  @Column({ name: 'follow_up', type: 'date', nullable: true })
  followUp: string;

  @Column({ type: 'text', nullable: true })
  note: string;

  @Column({ name: 'branch_id', nullable: true })
  branchId: number;

  @Column({ name: 'created_by', nullable: true })
  createdBy: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', nullable: true })
  updatedAt: Date;
}
