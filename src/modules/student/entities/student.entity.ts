import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('student')
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'register_no', nullable: true })
  registerNo: string;

  @Column({ name: 'admission_date', nullable: true })
  admissionDate: string;

  @Column({ name: 'first_name', nullable: true })
  firstName: string;

  @Column({ name: 'last_name', nullable: true })
  lastName: string;

  @Column({ nullable: true })
  gender: string;

  @Column({ nullable: true })
  birthday: string;

  @Column({ nullable: true })
  religion: string;

  @Column({ nullable: true })
  caste: string;

  @Column({ name: 'blood_group', nullable: true })
  bloodGroup: string;

  @Column({ name: 'mother_tongue', nullable: true })
  motherTongue: string;

  @Column({ name: 'current_address', type: 'text', nullable: true })
  currentAddress: string;

  @Column({ name: 'permanent_address', type: 'text', nullable: true })
  permanentAddress: string;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  state: string;

  @Column({ nullable: true })
  mobileno: string;

  @Column({ name: 'category_id', default: 0 })
  categoryId: number;

  @Column({ nullable: true })
  email: string;

  @Column({ name: 'parent_id', nullable: true })
  parentId: number;

  @Column({ name: 'route_id', default: 0 })
  routeId: number;

  @Column({ name: 'vehicle_id', default: 0 })
  vehicleId: number;

  @Column({ name: 'hostel_id', default: 0 })
  hostelId: number;

  @Column({ name: 'room_id', default: 0 })
  roomId: number;

  @Column({ name: 'fathers_nid', nullable: true })
  fathersNid: string;

  @Column({ name: 'mothers_nid', nullable: true })
  mothersNid: string;

  @Column({ name: 'birth_reg_no', nullable: true })
  birthRegNo: string;

  @Column({ name: 'previous_school', nullable: true })
  previousSchool: string;

  @Column({ name: 'previous_qualification', nullable: true })
  previousQualification: string;

  @Column({ type: 'text', nullable: true })
  remarks: string;

  @Column({ name: 'previous_details', type: 'text', nullable: true })
  previousDetails: string;

  @Column({ nullable: true })
  photo: string;

  @Column({ name: 'login_credential_id', nullable: true })
  loginCredentialId: number;

  @Column({ name: 'branch_id', nullable: true })
  branchId: number;

  @Column({ default: true })
  active: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', nullable: true })
  updatedAt: Date;
}
