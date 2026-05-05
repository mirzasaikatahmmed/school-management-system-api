import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('transport_assigns')
export class TransportAssign {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'student_id' })
  studentId: number;

  @Column({ name: 'route_id' })
  routeId: number;

  @Column({ name: 'stoppage_id', nullable: true })
  stoppageId: number;

  @Column({ name: 'vehicle_id', nullable: true })
  vehicleId: number;

  @Column({ name: 'session_id', nullable: true })
  sessionId: number;

  @Column({ name: 'branch_id', nullable: true })
  branchId: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
