import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('hostel')
export class Hostel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  name: string;

  @Column({ name: 'category_id' })
  categoryId: number;

  @Column({ type: 'text' })
  address: string;

  @Column({ type: 'text', nullable: true })
  watchman: string;

  @Column({ type: 'text', nullable: true })
  remarks: string;

  @Column({ name: 'branch_id', default: 0 })
  branchId: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', nullable: true })
  updatedAt: Date;
}
