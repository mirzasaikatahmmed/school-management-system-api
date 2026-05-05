import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('hostel_room')
export class HostelRoom {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  name: string;

  @Column({ name: 'hostel_id' })
  hostelId: number;

  @Column({ name: 'no_beds' })
  noBeds: number;

  @Column({ name: 'category_id', nullable: true })
  categoryId: number;

  @Column({ name: 'bed_fee', type: 'decimal', precision: 18, scale: 2 })
  bedFee: number;

  @Column({ type: 'text', nullable: true })
  remarks: string;

  @Column({ name: 'branch_id', nullable: true })
  branchId: number;
}
