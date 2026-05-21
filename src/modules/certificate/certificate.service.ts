import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from 'nestjs-api-forge';
import { CertificateTemplate } from './entities/certificate-template.entity';
import { CreateCertificateTemplateDto } from './dto/create-certificate-template.dto';

@Injectable()
export class CertificateService {
  constructor(
    @InjectRepository(CertificateTemplate)
    private templateRepo: Repository<CertificateTemplate>,
  ) {}

  createTemplate(dto: CreateCertificateTemplateDto) {
    return this.templateRepo.save(this.templateRepo.create(dto));
  }

  getTemplates(filters: { type?: string; branchId?: number }) {
    const qb = this.templateRepo.createQueryBuilder('t').orderBy('t.title');
    if (filters.type) qb.andWhere('t.type = :type', { type: filters.type });
    if (filters.branchId)
      qb.andWhere('t.branchId = :branchId', { branchId: filters.branchId });
    return qb.getMany();
  }

  async findTemplate(id: number) {
    const t = await this.templateRepo.findOneBy({ id });
    if (!t) throw new NotFoundException('Template not found');
    return t;
  }

  async updateTemplate(id: number, dto: Partial<CreateCertificateTemplateDto>) {
    const t = await this.findTemplate(id);
    return this.templateRepo.save({ ...t, ...dto });
  }

  async removeTemplate(id: number) {
    const t = await this.findTemplate(id);
    return this.templateRepo.remove(t);
  }
}
