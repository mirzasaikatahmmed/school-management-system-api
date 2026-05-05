import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('exam')
export class Exam {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  name: string;

  @Column({ name: 'term_id', nullable: true })
  termId: number;

  @Column({ name: 'type_id', type: 'smallint' })
  typeId: number;

  @Column({ name: 'session_id' })
  sessionId: number;

  @Column({ name: 'branch_id', nullable: true })
  branchId: number;

  @Column({ type: 'text', nullable: true })
  remark: string;

  @Column({ name: 'mark_distribution', type: 'text', nullable: true })
  markDistribution: string;

  @Column({ default: true })
  status: boolean;

  @Column({ name: 'publish_result', default: true })
  publishResult: boolean;

  @Column({ name: 'rank_generated', default: false })
  rankGenerated: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', nullable: true })
  updatedAt: Date;
}
