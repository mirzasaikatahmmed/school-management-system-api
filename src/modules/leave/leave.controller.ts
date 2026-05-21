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
import { LeaveService } from './leave.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '../../common/constants/roles.enum';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { ParseIntIdPipe } from '../../common/pipes/parse-int-id.pipe';
import { CreateLeaveCategoryDto } from './dto/create-leave-category.dto';
import { ApplyLeaveDto } from './dto/apply-leave.dto';
import { RejectLeaveDto } from './dto/reject-leave.dto';

@ApiTags('Leave')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('leave')
export class LeaveController {
  constructor(private readonly service: LeaveService) {}

  @Post('categories')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN)
  @ForgeMessage('Leave category created')
  @ApiOperation({ summary: 'Create a leave category' })
  @ApiBody({ type: CreateLeaveCategoryDto })
  createCategory(@Body() dto: CreateLeaveCategoryDto) {
    return this.service.createCategory(dto);
  }

  @Get('categories')
  @ForgeMessage('Leave categories fetched')
  @ApiOperation({ summary: 'List leave categories' })
  @ApiQuery({ name: 'branchId', required: false, type: Number })
  getCategories(@Query('branchId') branchId?: string) {
    return this.service.getCategories(branchId ? +branchId : undefined);
  }

  @Patch('categories/:id')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN)
  @ForgeMessage('Leave category updated')
  @ApiOperation({ summary: 'Update leave category' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: CreateLeaveCategoryDto })
  updateCategory(
    @Param('id', ParseIntIdPipe) id: number,
    @Body() dto: CreateLeaveCategoryDto,
  ) {
    return this.service.updateCategory(id, dto);
  }

  @Delete('categories/:id')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete leave category' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 204 })
  removeCategory(@Param('id', ParseIntIdPipe) id: number) {
    return this.service.removeCategory(id);
  }

  @Post('apply')
  @ForgeMessage('Leave application submitted')
  @ApiOperation({ summary: 'Apply for leave' })
  @ApiBody({ type: ApplyLeaveDto })
  applyLeave(@Body() dto: ApplyLeaveDto, @CurrentUser() user: any) {
    return this.service.applyLeave(dto, user.id);
  }

  @Get('applications')
  @ForgeMessage('Leave applications fetched')
  @ApiOperation({ summary: 'List leave applications' })
  @ApiQuery({ name: 'staffId', required: false, type: Number })
  @ApiQuery({
    name: 'status',
    required: false,
    type: String,
    description: 'pending | approved | rejected',
  })
  @ApiQuery({ name: 'branchId', required: false, type: Number })
  getApplications(
    @Query('staffId') staffId?: string,
    @Query('status') status?: string,
    @Query('branchId') branchId?: string,
  ) {
    return this.service.getApplications({
      staffId: staffId ? +staffId : undefined,
      status,
      branchId: branchId ? +branchId : undefined,
    });
  }

  @Patch('applications/:id/approve')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN)
  @ForgeMessage('Leave approved')
  @ApiOperation({ summary: 'Approve a leave application' })
  @ApiParam({ name: 'id', type: Number })
  approveLeave(
    @Param('id', ParseIntIdPipe) id: number,
    @CurrentUser() user: any,
  ) {
    return this.service.approveLeave(id, user.id);
  }

  @Patch('applications/:id/reject')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN)
  @ForgeMessage('Leave rejected')
  @ApiOperation({ summary: 'Reject a leave application' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: RejectLeaveDto })
  rejectLeave(
    @Param('id', ParseIntIdPipe) id: number,
    @Body() body: RejectLeaveDto,
    @CurrentUser() user: any,
  ) {
    return this.service.rejectLeave(id, body.rejectionReason, user.id);
  }
}
