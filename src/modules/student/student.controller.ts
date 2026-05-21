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
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
  ApiQuery,
  ApiBody,
} from '@nestjs/swagger';
import { ForgeMessage } from 'nestjs-api-forge';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { CreateEnrollDto } from './dto/create-enroll.dto';
import { CreatePromotionDto } from './dto/create-promotion.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '../../common/constants/roles.enum';
import { ParseIntIdPipe } from '../../common/pipes/parse-int-id.pipe';

@ApiTags('Students')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('students')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post()
  @Roles(Role.SUPER_ADMIN, Role.ADMIN)
  @ForgeMessage('Student created successfully')
  @ApiOperation({ summary: 'Register a new student' })
  create(@Body() dto: CreateStudentDto) {
    return this.studentService.create(dto);
  }

  @Get()
  @Roles(Role.SUPER_ADMIN, Role.ADMIN, Role.TEACHER)
  @ForgeMessage('Students fetched successfully')
  @ApiOperation({ summary: 'List students with optional filters' })
  @ApiQuery({ name: 'branchId', required: false, type: Number })
  @ApiQuery({ name: 'sessionId', required: false, type: Number })
  @ApiQuery({ name: 'classId', required: false, type: Number })
  @ApiQuery({ name: 'sectionId', required: false, type: Number })
  @ApiQuery({ name: 'active', required: false, type: Boolean })
  @ApiQuery({
    name: 'search',
    required: false,
    type: String,
    description: 'Search by name, register no, or mobile',
  })
  findAll(
    @Query('branchId') branchId?: string,
    @Query('sessionId') sessionId?: string,
    @Query('classId') classId?: string,
    @Query('sectionId') sectionId?: string,
    @Query('active') active?: string,
    @Query('search') search?: string,
  ) {
    return this.studentService.findAll({
      branchId: branchId ? +branchId : undefined,
      sessionId: sessionId ? +sessionId : undefined,
      classId: classId ? +classId : undefined,
      sectionId: sectionId ? +sectionId : undefined,
      active: active !== undefined ? active === 'true' : undefined,
      search,
    });
  }

  @Get(':id')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN, Role.TEACHER, Role.STUDENT, Role.PARENT)
  @ForgeMessage('Student fetched successfully')
  @ApiOperation({ summary: 'Get student by ID' })
  @ApiParam({ name: 'id', type: Number })
  findOne(@Param('id', ParseIntIdPipe) id: number) {
    return this.studentService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN)
  @ForgeMessage('Student updated successfully')
  @ApiOperation({ summary: 'Update student details' })
  @ApiParam({ name: 'id', type: Number })
  update(
    @Param('id', ParseIntIdPipe) id: number,
    @Body() dto: CreateStudentDto,
  ) {
    return this.studentService.update(id, dto);
  }

  @Delete(':id')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a student' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 204 })
  remove(@Param('id', ParseIntIdPipe) id: number) {
    return this.studentService.remove(id);
  }

  @Post('enroll')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN)
  @ForgeMessage('Student enrolled successfully')
  @ApiOperation({ summary: 'Enroll student in a class/section for a session' })
  enroll(@Body() dto: CreateEnrollDto) {
    return this.studentService.enroll(dto);
  }

  @Get('enrollments/list')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN, Role.TEACHER)
  @ForgeMessage('Enrollments fetched successfully')
  @ApiOperation({ summary: 'List enrollments with optional filters' })
  @ApiQuery({ name: 'studentId', required: false, type: Number })
  @ApiQuery({ name: 'classId', required: false, type: Number })
  @ApiQuery({ name: 'sectionId', required: false, type: Number })
  @ApiQuery({ name: 'sessionId', required: false, type: Number })
  @ApiQuery({ name: 'branchId', required: false, type: Number })
  getEnrollments(
    @Query('studentId') studentId?: string,
    @Query('classId') classId?: string,
    @Query('sectionId') sectionId?: string,
    @Query('sessionId') sessionId?: string,
    @Query('branchId') branchId?: string,
  ) {
    return this.studentService.getEnrollments({
      studentId: studentId ? +studentId : undefined,
      classId: classId ? +classId : undefined,
      sectionId: sectionId ? +sectionId : undefined,
      sessionId: sessionId ? +sessionId : undefined,
      branchId: branchId ? +branchId : undefined,
    });
  }

  @Get('categories/list')
  @ForgeMessage('Student categories fetched')
  @ApiOperation({ summary: 'List student categories' })
  @ApiQuery({ name: 'branchId', required: false, type: Number })
  getCategories(@Query('branchId') branchId?: string) {
    return this.studentService.findCategories(branchId ? +branchId : undefined);
  }

  @Post('categories')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN)
  @ForgeMessage('Student category created')
  @ApiOperation({ summary: 'Create a student category' })
  @ApiBody({
    schema: {
      properties: {
        name: { type: 'string', example: 'General' },
        branchId: { type: 'number', example: 1 },
      },
      required: ['name'],
    },
  })
  createCategory(
    @Body('name') name: string,
    @Body('branchId') branchId?: number,
  ) {
    return this.studentService.createCategory(name, branchId);
  }

  @Post('promote')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN)
  @ForgeMessage('Student promoted successfully')
  @ApiOperation({ summary: 'Promote a student to the next class/session' })
  @ApiBody({ type: CreatePromotionDto })
  promoteStudent(@Body() dto: CreatePromotionDto, @CurrentUser() user: any) {
    return this.studentService.promoteStudent(dto, user.id);
  }

  @Get(':id/promotion-history')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN)
  @ForgeMessage('Promotion history fetched')
  @ApiOperation({ summary: 'Get promotion history for a student' })
  @ApiParam({ name: 'id', type: Number })
  getPromotionHistory(@Param('id', ParseIntIdPipe) id: number) {
    return this.studentService.getPromotionHistory(id);
  }
}
