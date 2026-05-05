import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OnlineExamQuestion } from './entities/online-exam-question.entity';
import { OnlineExamSession } from './entities/online-exam-session.entity';
import { OnlineExamSubmission } from './entities/online-exam-submission.entity';
import { OnlineExamService } from './online-exam.service';
import { OnlineExamController } from './online-exam.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OnlineExamQuestion,
      OnlineExamSession,
      OnlineExamSubmission,
    ]),
  ],
  controllers: [OnlineExamController],
  providers: [OnlineExamService],
})
export class OnlineExamModule {}
