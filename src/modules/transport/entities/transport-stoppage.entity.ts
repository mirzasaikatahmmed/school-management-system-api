import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('transport_stoppages')
export class TransportStoppage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ name: 'route_id' })
  routeId: number;

  @Column({ name: 'pickup_time', nullable: true })
  pickupTime: string;

  @Column({ name: 'drop_time', nullable: true })
  dropTime: string;

  @Column({
    name: 'monthly_fee',
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0,
  })
  monthlyFee: number;

  @Column({ name: 'branch_id', nullable: true })
  branchId: number;
}
