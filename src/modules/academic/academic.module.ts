import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SchoolYear } from './school-year/entities/school-year.entity';
import { SchoolClass } from './class/entities/class.entity';
import { Section } from './section/entities/section.entity';
import { Subject } from './subject/entities/subject.entity';
import { SchoolYearService } from './school-year/school-year.service';
import { ClassService } from './class/class.service';
import { SectionService } from './section/section.service';
import { SubjectService } from './subject/subject.service';
import { SchoolYearController } from './school-year/school-year.controller';
import { ClassController } from './class/class.controller';
import { SectionController } from './section/section.controller';
import { SubjectController } from './subject/subject.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([SchoolYear, SchoolClass, Section, Subject]),
  ],
  controllers: [
    SchoolYearController,
    ClassController,
    SectionController,
    SubjectController,
  ],
  providers: [SchoolYearService, ClassService, SectionService, SubjectService],
  exports: [SchoolYearService, ClassService, SectionService, SubjectService],
})
export class AcademicModule {}
