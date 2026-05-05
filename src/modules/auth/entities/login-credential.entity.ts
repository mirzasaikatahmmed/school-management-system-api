import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { RoleEntity } from './role.entity';

@Entity('login_credential')
export class LoginCredential {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id' })
  userId: number;

  @Column({ length: 100, unique: true })
  username: string;

  @Column({ length: 250 })
  password: string;

  @Column({ type: 'smallint' })
  role: number;

  @Column({ default: true })
  active: boolean;

  @Column({ name: 'last_login', type: 'timestamp', nullable: true })
  lastLogin: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', nullable: true })
  updatedAt: Date;

  @ManyToOne(() => RoleEntity)
  @JoinColumn({ name: 'role', referencedColumnName: 'id' })
  roleDetail: RoleEntity;
}
