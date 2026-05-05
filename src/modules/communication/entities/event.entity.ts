import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('event')
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ name: 'event_type_id' })
  eventTypeId: number;

  @Column({ name: 'from_date', type: 'date' })
  fromDate: string;

  @Column({ name: 'to_date', type: 'date' })
  toDate: string;

  @Column({ name: 'from_time', nullable: true })
  fromTime: string;

  @Column({ name: 'to_time', nullable: true })
  toTime: string;

  @Column({ type: 'text', nullable: true })
  note: string;

  @Column({ nullable: true })
  photo: string;

  @Column({ name: 'branch_id', nullable: true })
  branchId: number;

  @Column({ name: 'session_id', nullable: true })
  sessionId: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', nullable: true })
  updatedAt: Date;
}
