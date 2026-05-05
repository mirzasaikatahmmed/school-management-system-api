import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('book')
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  cover: string;

  @Column()
  author: string;

  @Column({ name: 'isbn_no' })
  isbnNo: string;

  @Column({ name: 'category_id' })
  categoryId: number;

  @Column()
  publisher: string;

  @Column()
  edition: string;

  @Column({ name: 'purchase_date', type: 'date' })
  purchaseDate: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'decimal', precision: 18, scale: 2 })
  price: number;

  @Column({ name: 'total_stock' })
  totalStock: string;

  @Column({ name: 'issued_copies', default: '0' })
  issuedCopies: string;

  @Column({ name: 'branch_id', nullable: true })
  branchId: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', nullable: true })
  updatedAt: Date;
}
