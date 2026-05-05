import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiQuery,
} from '@nestjs/swagger';
import { ForgeMessage } from 'nestjs-api-forge';
import { DashboardService } from './dashboard.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '../../common/constants/roles.enum';

@ApiTags('Dashboard')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('dashboard')
export class DashboardController {
  constructor(private readonly service: DashboardService) {}

  @Get('stats')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN)
  @ForgeMessage('Dashboard stats fetched')
  @ApiOperation({ summary: 'Get summary statistics for dashboard' })
  @ApiQuery({ name: 'branchId', required: false, type: Number })
  @ApiQuery({ name: 'sessionId', required: false, type: Number })
  getStats(
    @Query('branchId') branchId?: string,
    @Query('sessionId') sessionId?: string,
  ) {
    return this.service.getStats(
      branchId ? +branchId : undefined,
      sessionId ? +sessionId : undefined,
    );
  }

  @Get('attendance-summary')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN, Role.TEACHER)
  @ForgeMessage('Attendance summary fetched')
  @ApiOperation({ summary: "Get today's attendance summary" })
  @ApiQuery({ name: 'branchId', required: false, type: Number })
  @ApiQuery({ name: 'sessionId', required: false, type: Number })
  getAttendanceSummary(
    @Query('branchId') branchId?: string,
    @Query('sessionId') sessionId?: string,
  ) {
    return this.service.getAttendanceSummary(
      branchId ? +branchId : undefined,
      sessionId ? +sessionId : undefined,
    );
  }

  @Get('recent-payments')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN, Role.ACCOUNTANT)
  @ForgeMessage('Recent payments fetched')
  @ApiOperation({ summary: 'Get recent fee payments' })
  @ApiQuery({ name: 'branchId', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  getRecentPayments(
    @Query('branchId') branchId?: string,
    @Query('limit') limit?: string,
  ) {
    return this.service.getRecentPayments(
      branchId ? +branchId : undefined,
      limit ? +limit : 10,
    );
  }
}
