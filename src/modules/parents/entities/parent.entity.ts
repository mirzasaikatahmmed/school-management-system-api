import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('parents')
export class Parent {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'full_name' })
  fullName: string;

  @Column({ nullable: true })
  relation: string;

  @Column({ name: 'father_name', nullable: true })
  fatherName: string;

  @Column({ name: 'mother_name', nullable: true })
  motherName: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  occupation: string;

  @Column({ nullable: true })
  income: string;

  @Column({ nullable: true })
  education: string;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  state: string;

  @Column({ nullable: true })
  address: string;

  @Column({ name: 'national_id', nullable: true })
  nationalId: string;

  @Column({ name: 'profile_photo', nullable: true })
  profilePhoto: string;

  @Column({ name: 'login_credential_id', nullable: true })
  loginCredentialId: number;

  @Column({ name: 'branch_id', nullable: true })
  branchId: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
