import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpCode,
  HttpStatus,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiParam,
  ApiQuery,
  ApiBody,
  ApiResponse,
} from '@nestjs/swagger';
import { ForgeMessage } from 'nestjs-api-forge';
import { OnlineExamService } from './online-exam.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '../../common/constants/roles.enum';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { ParseIntIdPipe } from '../../common/pipes/parse-int-id.pipe';

@ApiTags('Online Exam')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('online-exam')
export class OnlineExamController {
  constructor(private readonly service: OnlineExamService) {}

  @Post('questions')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN, Role.TEACHER)
  @ForgeMessage('Question created')
  @ApiOperation({ summary: 'Create an MCQ question' })
  @ApiBody({
    schema: {
      properties: {
        subjectId: { type: 'number' },
        question: { type: 'string', example: 'What is 2+2?' },
        optionA: { type: 'string', example: '3' },
        optionB: { type: 'string', example: '4' },
        optionC: { type: 'string', example: '5' },
        optionD: { type: 'string', example: '6' },
        correctAnswer: { type: 'string', example: 'B' },
        explanation: { type: 'string' },
        branchId: { type: 'number' },
      },
      required: ['question', 'optionA', 'optionB', 'correctAnswer'],
    },
  })
  createQuestion(@Body() dto: any) {
    return this.service.createQuestion(dto);
  }

  @Get('questions')
  @ForgeMessage('Questions fetched')
  @ApiOperation({ summary: 'List MCQ questions' })
  @ApiQuery({ name: 'subjectId', required: false, type: Number })
  @ApiQuery({ name: 'groupId', required: false, type: Number })
  @ApiQuery({ name: 'branchId', required: false, type: Number })
  getQuestions(
    @Query('subjectId') subjectId?: string,
    @Query('groupId') groupId?: string,
    @Query('branchId') branchId?: string,
  ) {
    return this.service.getQuestions({
      subjectId: subjectId ? +subjectId : undefined,
      groupId: groupId ? +groupId : undefined,
      branchId: branchId ? +branchId : undefined,
    });
  }

  @Patch('questions/:id')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN, Role.TEACHER)
  @ForgeMessage('Question updated')
  @ApiOperation({ summary: 'Update a question' })
  @ApiParam({ name: 'id', type: Number })
  updateQuestion(@Param('id', ParseIntIdPipe) id: number, @Body() dto: any) {
    return this.service.updateQuestion(id, dto);
  }

  @Delete('questions/:id')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN, Role.TEACHER)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a question' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 204 })
  removeQuestion(@Param('id', ParseIntIdPipe) id: number) {
    return this.service.removeQuestion(id);
  }

  @Post('sessions')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN, Role.TEACHER)
  @ForgeMessage('Exam session created')
  @ApiOperation({ summary: 'Create an online exam session' })
  @ApiBody({
    schema: {
      properties: {
        title: { type: 'string', example: 'Math Quiz 1' },
        classId: { type: 'number', example: 1 },
        subjectId: { type: 'number', example: 1 },
        examDate: { type: 'string', example: '2025-06-15' },
        startTime: { type: 'string', example: '09:00' },
        endTime: { type: 'string', example: '10:00' },
        durationMinutes: { type: 'number', example: 60 },
        totalMarks: { type: 'number', example: 50 },
        passMarks: { type: 'number', example: 20 },
        branchId: { type: 'number', example: 1 },
        sessionId: { type: 'number', example: 6 },
      },
      required: ['title', 'classId', 'examDate', 'startTime', 'endTime'],
    },
  })
  createSession(@Body() dto: any) {
    return this.service.createSession(dto);
  }

  @Get('sessions')
  @ForgeMessage('Exam sessions fetched')
  @ApiOperation({ summary: 'List online exam sessions' })
  @ApiQuery({ name: 'classId', required: false, type: Number })
  @ApiQuery({ name: 'branchId', required: false, type: Number })
  @ApiQuery({ name: 'sessionId', required: false, type: Number })
  getSessions(
    @Query('classId') classId?: string,
    @Query('branchId') branchId?: string,
    @Query('sessionId') sessionId?: string,
  ) {
    return this.service.getSessions({
      classId: classId ? +classId : undefined,
      branchId: branchId ? +branchId : undefined,
      sessionId: sessionId ? +sessionId : undefined,
    });
  }

  @Patch('sessions/:id')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN, Role.TEACHER)
  @ForgeMessage('Session updated')
  @ApiOperation({ summary: 'Update an exam session' })
  @ApiParam({ name: 'id', type: Number })
  updateSession(@Param('id', ParseIntIdPipe) id: number, @Body() dto: any) {
    return this.service.updateSession(id, dto);
  }

  @Delete('sessions/:id')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete an exam session' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 204 })
  removeSession(@Param('id', ParseIntIdPipe) id: number) {
    return this.service.removeSession(id);
  }

  @Post('submit')
  @Roles(Role.STUDENT)
  @ForgeMessage('Exam submitted successfully')
  @ApiOperation({ summary: 'Submit an online exam (auto-scored)' })
  @ApiBody({
    schema: {
      properties: {
        examSessionId: { type: 'number', example: 1 },
        answers: {
          type: 'object',
          example: { '1': 'A', '2': 'C' },
          description: 'Map of question ID to answer option',
        },
        branchId: { type: 'number', example: 1 },
      },
      required: ['examSessionId', 'answers'],
    },
  })
  submitExam(@Body() dto: any, @CurrentUser() user: any) {
    return this.service.submitExam({ ...dto, studentId: user.id });
  }

  @Get('submissions')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN, Role.TEACHER, Role.STUDENT)
  @ForgeMessage('Submissions fetched')
  @ApiOperation({ summary: 'Get exam submissions' })
  @ApiQuery({ name: 'examSessionId', required: false, type: Number })
  @ApiQuery({ name: 'studentId', required: false, type: Number })
  @ApiQuery({ name: 'branchId', required: false, type: Number })
  getSubmissions(
    @Query('examSessionId') examSessionId?: string,
    @Query('studentId') studentId?: string,
    @Query('branchId') branchId?: string,
  ) {
    return this.service.getSubmissions({
      examSessionId: examSessionId ? +examSessionId : undefined,
      studentId: studentId ? +studentId : undefined,
      branchId: branchId ? +branchId : undefined,
    });
  }
}
