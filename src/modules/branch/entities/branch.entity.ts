import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('branch')
export class Branch {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column({ name: 'school_name' })
  schoolName: string;

  @Column()
  email: string;

  @Column()
  mobileno: string;

  @Column()
  currency: string;

  @Column()
  symbol: string;

  @Column({ name: 'currency_formats', type: 'smallint', default: 1 })
  currencyFormats: number;

  @Column({ name: 'symbol_position', type: 'smallint', default: 1 })
  symbolPosition: number;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  state: string;

  @Column({ type: 'text', nullable: true })
  address: string;

  @Column({ name: 'stu_generate', type: 'smallint', default: 0 })
  stuGenerate: number;

  @Column({ name: 'stu_username_prefix', nullable: true })
  stuUsernamePrefix: string;

  @Column({ name: 'stu_default_password', nullable: true })
  stuDefaultPassword: string;

  @Column({ name: 'grd_generate', type: 'smallint', default: 0 })
  grdGenerate: number;

  @Column({ name: 'grd_username_prefix', nullable: true })
  grdUsernamePrefix: string;

  @Column({ name: 'grd_default_password', nullable: true })
  grdDefaultPassword: string;

  @Column({ name: 'teacher_restricted', default: true })
  teacherRestricted: boolean;

  @Column({ name: 'due_days', type: 'float', default: 30 })
  dueDays: number;

  @Column({ name: 'due_with_fine', type: 'smallint', default: 1 })
  dueWithFine: number;

  @Column({ default: 'english' })
  translation: string;

  @Column({ nullable: true })
  timezone: string;

  @Column({ nullable: true })
  weekends: string;

  @Column({ name: 'reg_prefix_enable', default: false })
  regPrefixEnable: boolean;

  @Column({ name: 'student_login', type: 'smallint', default: 1 })
  studentLogin: number;

  @Column({ name: 'parent_login', type: 'smallint', default: 1 })
  parentLogin: number;

  @Column({ name: 'teacher_mobile_visible', type: 'smallint', default: 1 })
  teacherMobileVisible: number;

  @Column({ name: 'teacher_email_visible', type: 'smallint', default: 1 })
  teacherEmailVisible: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', nullable: true })
  updatedAt: Date;
}
