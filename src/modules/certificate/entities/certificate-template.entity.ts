import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

export enum CertificateType {
  CERTIFICATE = 'certificate',
  ID_CARD = 'id_card',
  ADMIT_CARD = 'admit_card',
}

@Entity('certificate_templates')
export class CertificateTemplate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'enum', enum: CertificateType })
  type: CertificateType;

  @Column({ type: 'text', nullable: true })
  content: string;

  @Column({ name: 'header_image', nullable: true })
  headerImage: string;

  @Column({ name: 'background_image', nullable: true })
  backgroundImage: string;

  @Column({ name: 'branch_id', nullable: true })
  branchId: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
