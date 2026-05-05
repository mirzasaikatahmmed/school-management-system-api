import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Query,
  Param,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { ForgeMessage } from 'nestjs-api-forge';
import { AttendanceService } from './attendance.service';
import {
  MarkStudentAttendanceDto,
  MarkStaffAttendanceDto,
} from './dto/mark-attendance.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '../../common/constants/roles.enum';
import { ParseIntIdPipe } from '../../common/pipes/parse-int-id.pipe';

@ApiTags('Attendance')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Post('students')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN, Role.TEACHER)
  @ForgeMessage('Student attendance marked')
  @ApiOperation({ summary: 'Mark student attendance for a date' })
  markStudentAttendance(@Body() dto: MarkStudentAttendanceDto) {
    return this.attendanceService.markStudentAttendance(dto);
  }

  @Get('students')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN, Role.TEACHER)
  @ForgeMessage('Student attendance fetched')
  @ApiOperation({ summary: 'Get student attendance records' })
  @ApiQuery({ name: 'enrollId', required: false, type: Number })
  @ApiQuery({
    name: 'date',
    required: false,
    type: String,
    example: '2025-05-05',
  })
  @ApiQuery({ name: 'branchId', required: false, type: Number })
  @ApiQuery({ name: 'fromDate', required: false, type: String })
  @ApiQuery({ name: 'toDate', required: false, type: String })
  getStudentAttendance(
    @Query('enrollId') enrollId?: string,
    @Query('date') date?: string,
    @Query('branchId') branchId?: string,
    @Query('fromDate') fromDate?: string,
    @Query('toDate') toDate?: string,
  ) {
    return this.attendanceService.getStudentAttendance({
      enrollId: enrollId ? +enrollId : undefined,
      date,
      branchId: branchId ? +branchId : undefined,
      fromDate,
      toDate,
    });
  }

  @Get('students/:enrollId/summary')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN, Role.TEACHER, Role.STUDENT, Role.PARENT)
  @ForgeMessage('Attendance summary fetched')
  @ApiOperation({
    summary: 'Get attendance summary (P/A/H/L counts) for a student',
  })
  @ApiParam({ name: 'enrollId', type: Number })
  @ApiQuery({
    name: 'fromDate',
    required: true,
    type: String,
    example: '2025-01-01',
  })
  @ApiQuery({
    name: 'toDate',
    required: true,
    type: String,
    example: '2025-12-31',
  })
  getStudentSummary(
    @Param('enrollId', ParseIntIdPipe) enrollId: number,
    @Query('fromDate') fromDate: string,
    @Query('toDate') toDate: string,
  ) {
    return this.attendanceService.getStudentAttendanceSummary(
      enrollId,
      fromDate,
      toDate,
    );
  }

  @Post('staff')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN)
  @ForgeMessage('Staff attendance marked')
  @ApiOperation({ summary: 'Mark staff attendance for a date' })
  markStaffAttendance(@Body() dto: MarkStaffAttendanceDto) {
    return this.attendanceService.markStaffAttendance(dto);
  }

  @Get('staff')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN)
  @ForgeMessage('Staff attendance fetched')
  @ApiOperation({ summary: 'Get staff attendance records' })
  @ApiQuery({ name: 'staffId', required: false, type: Number })
  @ApiQuery({ name: 'date', required: false, type: String })
  @ApiQuery({ name: 'branchId', required: false, type: Number })
  @ApiQuery({ name: 'fromDate', required: false, type: String })
  @ApiQuery({ name: 'toDate', required: false, type: String })
  getStaffAttendance(
    @Query('staffId') staffId?: string,
    @Query('date') date?: string,
    @Query('branchId') branchId?: string,
    @Query('fromDate') fromDate?: string,
    @Query('toDate') toDate?: string,
  ) {
    return this.attendanceService.getStaffAttendance({
      staffId: staffId ? +staffId : undefined,
      date,
      branchId: branchId ? +branchId : undefined,
      fromDate,
      toDate,
    });
  }
}
