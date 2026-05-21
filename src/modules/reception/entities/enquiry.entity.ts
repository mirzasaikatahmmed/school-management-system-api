import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum EnquiryStatus {
  ACTIVE = 'active',
  PARTIALLY_CLOSED = 'partially_closed',
  MISSED = 'missed',
  CLOSED = 'closed',
}

@Entity('enquiry')
export class Enquiry {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ name: 'father_name', nullable: true })
  fatherName: string;

  @Column({ name: 'mother_name', nullable: true })
  motherName: string;

  @Column({ nullable: true })
  gender: string;

  @Column({ name: 'mobile_no', nullable: true })
  mobileNo: string;

  @Column({ nullable: true })
  email: string;

  @Column({ type: 'date' })
  date: string;

  @Column({ type: 'date', nullable: true })
  birthday: string;

  @Column({ type: 'text', nullable: true })
  address: string;

  @Column({ name: 'previous_school', type: 'text', nullable: true })
  previousSchool: string;

  @Column({ name: 'no_of_child', nullable: true })
  noOfChild: number;

  @Column({ name: 'class_id', nullable: true })
  classId: number;

  @Column({ name: 'reference_id', nullable: true })
  referenceId: number;

  @Column({ name: 'response_id', nullable: true })
  responseId: number;

  @Column({ type: 'text', nullable: true })
  response: string;

  @Column({ type: 'text', nullable: true })
  note: string;

  @Column({
    type: 'enum',
    enum: EnquiryStatus,
    default: EnquiryStatus.ACTIVE,
  })
  status: EnquiryStatus;

  @Column({ name: 'assigned_id', nullable: true })
  assignedId: number;

  @Column({ name: 'branch_id', nullable: true })
  branchId: number;

  @Column({ name: 'created_by', nullable: true })
  createdBy: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', nullable: true })
  updatedAt: Date;
}
