import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('staff')
export class Staff {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'staff_id', length: 25 })
  staffId: string;

  @Column()
  name: string;

  @Column()
  department: number;

  @Column()
  qualification: string;

  @Column({ name: 'experience_details', nullable: true })
  experienceDetails: string;

  @Column({ name: 'total_experience', nullable: true })
  totalExperience: string;

  @Column()
  designation: number;

  @Column({ name: 'joining_date' })
  joiningDate: string;

  @Column()
  birthday: string;

  @Column()
  sex: string;

  @Column()
  religion: string;

  @Column({ name: 'blood_group' })
  bloodGroup: string;

  @Column({ name: 'present_address', type: 'text' })
  presentAddress: string;

  @Column({ name: 'permanent_address', type: 'text' })
  permanentAddress: string;

  @Column()
  mobileno: string;

  @Column()
  email: string;

  @Column({ name: 'salary_template_id', default: 0 })
  salaryTemplateId: number;

  @Column({ name: 'branch_id', nullable: true })
  branchId: number;

  @Column({ nullable: true })
  photo: string;

  @Column({ name: 'facebook_url', nullable: true })
  facebookUrl: string;

  @Column({ name: 'linkedin_url', nullable: true })
  linkedinUrl: string;

  @Column({ name: 'twitter_url', nullable: true })
  twitterUrl: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', nullable: true })
  updatedAt: Date;
}
