import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('subject')
export class Subject {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ name: 'subject_code' })
  subjectCode: string;

  @Column({ name: 'subject_type' })
  subjectType: string;

  @Column({ name: 'subject_author', nullable: true })
  subjectAuthor: string;

  @Column({ name: 'branch_id', nullable: true })
  branchId: number;
}
