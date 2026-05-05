import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Alumni } from './entities/alumni.entity';
import { AlumniService } from './alumni.service';
import { AlumniController } from './alumni.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Alumni])],
  controllers: [AlumniController],
  providers: [AlumniService],
})
export class AlumniModule {}
