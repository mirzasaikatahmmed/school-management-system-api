import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Exam } from './entities/exam.entity';
import { ExamTerm } from './entities/exam-term.entity';
import { Grade } from './entities/grade.entity';
import { Mark } from './entities/mark.entity';
import { ExamService } from './exam.service';
import { ExamController } from './exam.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Exam, ExamTerm, Grade, Mark])],
  controllers: [ExamController],
  providers: [ExamService],
  exports: [ExamService],
})
export class ExamModule {}
