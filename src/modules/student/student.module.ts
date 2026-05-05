import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { Enroll } from './entities/enroll.entity';
import { StudentCategory } from './entities/student-category.entity';
import { StudentPromotion } from './entities/student-promotion.entity';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Student,
      Enroll,
      StudentCategory,
      StudentPromotion,
    ]),
  ],
  controllers: [StudentController],
  providers: [StudentService],
  exports: [StudentService],
})
export class StudentModule {}
