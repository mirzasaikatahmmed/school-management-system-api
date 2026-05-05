import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { ForgeMessage } from 'nestjs-api-forge';
import { ExamService } from './exam.service';
import {
  CreateExamDto,
  CreateExamTermDto,
  CreateGradeDto,
  SubmitMarkDto,
} from './dto/create-exam.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '../../common/constants/roles.enum';
import { ParseIntIdPipe } from '../../common/pipes/parse-int-id.pipe';

@ApiTags('Exam')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('exam')
export class ExamController {
  constructor(private readonly examService: ExamService) {}

  @Post('terms')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN)
  @ForgeMessage('Exam term created')
  @ApiOperation({ summary: 'Create an exam term' })
  createTerm(@Body() dto: CreateExamTermDto) {
    return this.examService.createTerm(dto);
  }

  @Get('terms')
  @ForgeMessage('Exam terms fetched')
  @ApiOperation({ summary: 'List exam terms' })
  @ApiQuery({ name: 'branchId', required: false, type: Number })
  @ApiQuery({ name: 'sessionId', required: false, type: Number })
  getTerms(
    @Query('branchId') branchId?: string,
    @Query('sessionId') sessionId?: string,
  ) {
    return this.examService.getTerms(
      branchId ? +branchId : undefined,
      sessionId ? +sessionId : undefined,
    );
  }

  @Post()
  @Roles(Role.SUPER_ADMIN, Role.ADMIN)
  @ForgeMessage('Exam created')
  @ApiOperation({ summary: 'Create an exam' })
  createExam(@Body() dto: CreateExamDto) {
    return this.examService.createExam(dto);
  }

  @Get()
  @ForgeMessage('Exams fetched')
  @ApiOperation({ summary: 'List exams' })
  @ApiQuery({ name: 'branchId', required: false, type: Number })
  @ApiQuery({ name: 'sessionId', required: false, type: Number })
  getExams(
    @Query('branchId') branchId?: string,
    @Query('sessionId') sessionId?: string,
  ) {
    return this.examService.getExams(
      branchId ? +branchId : undefined,
      sessionId ? +sessionId : undefined,
    );
  }

  @Get(':id')
  @ForgeMessage('Exam fetched')
  @ApiOperation({ summary: 'Get exam by ID' })
  @ApiParam({ name: 'id', type: Number })
  findExam(@Param('id', ParseIntIdPipe) id: number) {
    return this.examService.findExam(id);
  }

  @Patch(':id')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN)
  @ForgeMessage('Exam updated')
  @ApiOperation({ summary: 'Update an exam' })
  @ApiParam({ name: 'id', type: Number })
  updateExam(
    @Param('id', ParseIntIdPipe) id: number,
    @Body() dto: CreateExamDto,
  ) {
    return this.examService.updateExam(id, dto);
  }

  @Post('grades')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN)
  @ForgeMessage('Grade created')
  @ApiOperation({ summary: 'Create a grade scale entry' })
  createGrade(@Body() dto: CreateGradeDto) {
    return this.examService.createGrade(dto);
  }

  @Get('grades/list')
  @ForgeMessage('Grades fetched')
  @ApiOperation({ summary: 'List grade scale' })
  @ApiQuery({ name: 'branchId', required: false, type: Number })
  getGrades(@Query('branchId') branchId?: string) {
    return this.examService.getGrades(branchId ? +branchId : undefined);
  }

  @Post('marks')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN, Role.TEACHER)
  @ForgeMessage('Mark submitted')
  @ApiOperation({ summary: 'Submit or update a student mark' })
  submitMark(@Body() dto: SubmitMarkDto) {
    return this.examService.submitMark(dto);
  }

  @Get('marks/list')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN, Role.TEACHER, Role.STUDENT, Role.PARENT)
  @ForgeMessage('Marks fetched')
  @ApiOperation({ summary: 'Get marks with optional filters' })
  @ApiQuery({ name: 'examId', required: false, type: Number })
  @ApiQuery({ name: 'classId', required: false, type: Number })
  @ApiQuery({ name: 'sectionId', required: false, type: Number })
  @ApiQuery({ name: 'studentId', required: false, type: Number })
  @ApiQuery({ name: 'sessionId', required: false, type: Number })
  @ApiQuery({ name: 'branchId', required: false, type: Number })
  getMarks(
    @Query('examId') examId?: string,
    @Query('classId') classId?: string,
    @Query('sectionId') sectionId?: string,
    @Query('studentId') studentId?: string,
    @Query('sessionId') sessionId?: string,
    @Query('branchId') branchId?: string,
  ) {
    return this.examService.getMarks({
      examId: examId ? +examId : undefined,
      classId: classId ? +classId : undefined,
      sectionId: sectionId ? +sectionId : undefined,
      studentId: studentId ? +studentId : undefined,
      sessionId: sessionId ? +sessionId : undefined,
      branchId: branchId ? +branchId : undefined,
    });
  }
}
