import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Timetable } from './entities/timetable.entity';
import { ExamTimetable } from './entities/exam-timetable.entity';
import { TimetableService } from './timetable.service';
import { TimetableController } from './timetable.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Timetable, ExamTimetable])],
  controllers: [TimetableController],
  providers: [TimetableService],
})
export class TimetableModule {}
