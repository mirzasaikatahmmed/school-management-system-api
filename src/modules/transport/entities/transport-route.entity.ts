import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('transport_route')
export class TransportRoute {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  name: string;

  @Column({ name: 'start_place', type: 'text' })
  startPlace: string;

  @Column({ type: 'text', nullable: true })
  remarks: string;

  @Column({ name: 'stop_place', type: 'text', nullable: true })
  stopPlace: string;

  @Column({ name: 'branch_id', nullable: true })
  branchId: number;
}
