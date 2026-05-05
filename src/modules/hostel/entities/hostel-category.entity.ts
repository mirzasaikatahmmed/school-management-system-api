import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('hostel_categories')
export class HostelCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ name: 'branch_id', nullable: true })
  branchId: number;
}
