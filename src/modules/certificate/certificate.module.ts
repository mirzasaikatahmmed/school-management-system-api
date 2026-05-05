import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CertificateTemplate } from './entities/certificate-template.entity';
import { CertificateService } from './certificate.service';
import { CertificateController } from './certificate.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CertificateTemplate])],
  controllers: [CertificateController],
  providers: [CertificateService],
})
export class CertificateModule {}
