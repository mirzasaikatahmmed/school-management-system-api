import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('inventory_products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ name: 'category_id', nullable: true })
  categoryId: number;

  @Column({ name: 'unit_id', nullable: true })
  unitId: number;

  @Column({
    name: 'purchase_price',
    type: 'decimal',
    precision: 12,
    scale: 2,
    default: 0,
  })
  purchasePrice: number;

  @Column({
    name: 'sale_price',
    type: 'decimal',
    precision: 12,
    scale: 2,
    default: 0,
  })
  salePrice: number;

  @Column({ name: 'current_stock', default: 0 })
  currentStock: number;

  @Column({ name: 'branch_id', nullable: true })
  branchId: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
