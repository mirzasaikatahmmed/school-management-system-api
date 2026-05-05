import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('transport_vehicle')
export class TransportVehicle {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'vehicle_no', type: 'text' })
  vehicleNo: string;

  @Column({ type: 'text' })
  capacity: string;

  @Column({ name: 'insurance_renewal', type: 'text' })
  insuranceRenewal: string;

  @Column({ name: 'driver_name', type: 'text' })
  driverName: string;

  @Column({ name: 'driver_phone', type: 'text' })
  driverPhone: string;

  @Column({ name: 'driver_license', type: 'text' })
  driverLicense: string;

  @Column({ name: 'branch_id', nullable: true })
  branchId: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', nullable: true })
  updatedAt: Date;
}
