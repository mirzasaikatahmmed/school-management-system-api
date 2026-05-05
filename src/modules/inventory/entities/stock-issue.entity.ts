import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('stock_issues')
export class StockIssue {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'product_id' })
  productId: number;

  @Column()
  quantity: number;

  @Column({ name: 'issue_date', type: 'date' })
  issueDate: string;

  @Column({ name: 'issued_to', nullable: true })
  issuedTo: string;

  @Column({ nullable: true })
  note: string;

  @Column({ name: 'branch_id', nullable: true })
  branchId: number;

  @Column({ name: 'issued_by', nullable: true })
  issuedBy: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
