import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('inventory_categories')
export class InventoryCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ name: 'branch_id', nullable: true })
  branchId: number;
}
