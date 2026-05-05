import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('book_issues')
export class BookIssue {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'book_id' })
  bookId: number;

  @Column({ name: 'user_id' })
  userId: number;

  @Column({ name: 'role_id' })
  roleId: number;

  @Column({ name: 'date_of_issue', type: 'date', nullable: true })
  dateOfIssue: string;

  @Column({ name: 'date_of_expiry', type: 'date', nullable: true })
  dateOfExpiry: string;

  @Column({ name: 'return_date', type: 'date', nullable: true })
  returnDate: string;

  @Column({
    name: 'fine_amount',
    type: 'decimal',
    precision: 18,
    scale: 2,
    default: 0,
  })
  fineAmount: number;

  @Column({ type: 'smallint', default: 0 })
  status: number;

  @Column({ name: 'issued_by', nullable: true })
  issuedBy: string;

  @Column({ name: 'return_by', nullable: true })
  returnBy: number;

  @Column({ name: 'session_id' })
  sessionId: number;

  @Column({ name: 'branch_id', nullable: true })
  branchId: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
