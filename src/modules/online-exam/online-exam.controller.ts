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
import { CreateQuestionDto } from './dto/create-question.dto';
import { CreateExamSessionDto } from './dto/create-exam-session.dto';
import { SubmitExamDto } from './dto/submit-exam.dto';

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
  @ApiBody({ type: CreateQuestionDto })
  createQuestion(@Body() dto: CreateQuestionDto) {
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
  @ApiBody({ type: CreateQuestionDto })
  updateQuestion(@Param('id', ParseIntIdPipe) id: number, @Body() dto: CreateQuestionDto) {
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
  @ApiBody({ type: CreateExamSessionDto })
  createSession(@Body() dto: CreateExamSessionDto) {
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
  @ApiBody({ type: CreateExamSessionDto })
  updateSession(@Param('id', ParseIntIdPipe) id: number, @Body() dto: CreateExamSessionDto) {
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
  @ApiBody({ type: SubmitExamDto })
  submitExam(@Body() dto: SubmitExamDto, @CurrentUser() user: any) {
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
