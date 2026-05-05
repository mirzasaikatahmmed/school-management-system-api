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
import { HomeworkService } from './homework.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '../../common/constants/roles.enum';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { ParseIntIdPipe } from '../../common/pipes/parse-int-id.pipe';

@ApiTags('Homework')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('homework')
export class HomeworkController {
  constructor(private readonly service: HomeworkService) {}

  @Post()
  @Roles(Role.SUPER_ADMIN, Role.ADMIN, Role.TEACHER)
  @ForgeMessage('Homework created')
  @ApiOperation({ summary: 'Create a homework assignment' })
  @ApiBody({
    schema: {
      properties: {
        classId: { type: 'number', example: 1 },
        sectionId: { type: 'number' },
        subjectId: { type: 'number', example: 1 },
        title: { type: 'string', example: 'Chapter 5 Exercises' },
        description: { type: 'string' },
        submissionDate: { type: 'string', example: '2025-06-10' },
        maxMarks: { type: 'number', example: 20 },
        branchId: { type: 'number', example: 1 },
        sessionId: { type: 'number', example: 6 },
      },
      required: ['classId', 'subjectId', 'title', 'submissionDate'],
    },
  })
  createHomework(@Body() dto: any, @CurrentUser() user: any) {
    return this.service.createHomework(dto, user.id);
  }

  @Get()
  @ForgeMessage('Homeworks fetched')
  @ApiOperation({ summary: 'List homework assignments' })
  @ApiQuery({ name: 'classId', required: false, type: Number })
  @ApiQuery({ name: 'sectionId', required: false, type: Number })
  @ApiQuery({ name: 'subjectId', required: false, type: Number })
  @ApiQuery({ name: 'branchId', required: false, type: Number })
  @ApiQuery({ name: 'sessionId', required: false, type: Number })
  getHomeworks(
    @Query('classId') classId?: string,
    @Query('sectionId') sectionId?: string,
    @Query('subjectId') subjectId?: string,
    @Query('branchId') branchId?: string,
    @Query('sessionId') sessionId?: string,
  ) {
    return this.service.getHomeworks({
      classId: classId ? +classId : undefined,
      sectionId: sectionId ? +sectionId : undefined,
      subjectId: subjectId ? +subjectId : undefined,
      branchId: branchId ? +branchId : undefined,
      sessionId: sessionId ? +sessionId : undefined,
    });
  }

  @Patch(':id')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN, Role.TEACHER)
  @ForgeMessage('Homework updated')
  @ApiOperation({ summary: 'Update a homework assignment' })
  @ApiParam({ name: 'id', type: Number })
  updateHomework(@Param('id', ParseIntIdPipe) id: number, @Body() dto: any) {
    return this.service.updateHomework(id, dto);
  }

  @Delete(':id')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN, Role.TEACHER)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a homework assignment' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 204 })
  removeHomework(@Param('id', ParseIntIdPipe) id: number) {
    return this.service.removeHomework(id);
  }

  @Post('submit')
  @Roles(Role.STUDENT)
  @ForgeMessage('Homework submitted')
  @ApiOperation({ summary: 'Submit homework (student)' })
  @ApiBody({
    schema: {
      properties: {
        homeworkId: { type: 'number', example: 1 },
        content: { type: 'string' },
        filePath: { type: 'string' },
      },
      required: ['homeworkId'],
    },
  })
  submitHomework(@Body() dto: any, @CurrentUser() user: any) {
    return this.service.submitHomework(dto, user.id);
  }

  @Get('submissions')
  @ForgeMessage('Submissions fetched')
  @ApiOperation({ summary: 'List homework submissions' })
  @ApiQuery({ name: 'homeworkId', required: false, type: Number })
  @ApiQuery({ name: 'studentId', required: false, type: Number })
  getSubmissions(
    @Query('homeworkId') homeworkId?: string,
    @Query('studentId') studentId?: string,
  ) {
    return this.service.getSubmissions({
      homeworkId: homeworkId ? +homeworkId : undefined,
      studentId: studentId ? +studentId : undefined,
    });
  }

  @Patch('submissions/:id/evaluate')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN, Role.TEACHER)
  @ForgeMessage('Submission evaluated')
  @ApiOperation({ summary: 'Evaluate a homework submission' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({
    schema: {
      properties: {
        obtainedMarks: { type: 'number', example: 18 },
        feedback: { type: 'string', example: 'Good work!' },
      },
    },
  })
  evaluateSubmission(
    @Param('id', ParseIntIdPipe) id: number,
    @Body() dto: any,
    @CurrentUser() user: any,
  ) {
    return this.service.evaluateSubmission(id, dto, user.id);
  }
}
