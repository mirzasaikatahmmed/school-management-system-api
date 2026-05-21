import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('book_category')
export class BookCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ name: 'branch_id', nullable: true })
  branchId: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
