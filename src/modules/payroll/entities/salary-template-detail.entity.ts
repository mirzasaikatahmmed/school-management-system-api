import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum AllowanceType {
  ALLOWANCE = 'allowance',
  DEDUCTION = 'deduction',
}

@Entity('salary_template_details')
export class SalaryTemplateDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'template_id' })
  templateId: number;

  @Column()
  title: string;

  @Column({ type: 'enum', enum: AllowanceType })
  type: AllowanceType;

  @Column({ name: 'amount_type', default: 'fixed' })
  amountType: string;

  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  amount: number;
}
