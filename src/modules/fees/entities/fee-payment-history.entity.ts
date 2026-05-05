import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('fee_payment_history')
export class FeePaymentHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'allocation_id' })
  allocationId: number;

  @Column({ name: 'type_id' })
  typeId: number;

  @Column({ name: 'collect_by', nullable: true })
  collectBy: string;

  @Column({ type: 'decimal', precision: 18, scale: 2 })
  amount: number;

  @Column({ type: 'decimal', precision: 18, scale: 2, default: 0 })
  discount: number;

  @Column({ type: 'decimal', precision: 18, scale: 2, default: 0 })
  fine: number;

  @Column({ name: 'pay_via' })
  payVia: string;

  @Column({ type: 'text', nullable: true })
  remarks: string;

  @Column({ type: 'date', nullable: true })
  date: string;
}
