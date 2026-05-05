import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

export enum PostalType {
  RECEIVE = 'receive',
  DISPATCH = 'dispatch',
}

@Entity('postal_records')
export class PostalRecord {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: PostalType })
  type: PostalType;

  @Column()
  from: string;

  @Column()
  to: string;

  @Column({ name: 'reference_no', nullable: true })
  referenceNo: string;

  @Column({ nullable: true })
  subject: string;

  @Column({ name: 'postal_date', type: 'date' })
  postalDate: string;

  @Column({ nullable: true })
  note: string;

  @Column({ name: 'branch_id', nullable: true })
  branchId: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
