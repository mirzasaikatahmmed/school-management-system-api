import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('section')
export class Section {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  capacity: string;

  @Column({ name: 'branch_id', nullable: true })
  branchId: number;
}
