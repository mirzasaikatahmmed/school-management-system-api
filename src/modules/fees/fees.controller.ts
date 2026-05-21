import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  UseGuards,
  Query,
  Param,
  HttpCode,
  HttpStatus,
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
import { FeesService } from './fees.service';
import {
  CreateFeeAllocationDto,
  CollectPaymentDto,
} from './dto/create-payment.dto';
import { CreateFeeTypeDto } from './dto/create-fee-type.dto';
import { CreateFeeGroupDto } from './dto/create-fee-group.dto';
import { CreateFeeFineDto } from './dto/create-fee-fine.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '../../common/constants/roles.enum';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { ParseIntIdPipe } from '../../common/pipes/parse-int-id.pipe';

@ApiTags('Fees')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('fees')
export class FeesController {
  constructor(private readonly feesService: FeesService) {}

  @Get('types')
  @ForgeMessage('Fee types fetched')
  @ApiOperation({ summary: 'List all fee types' })
  @ApiQuery({ name: 'branchId', required: false, type: Number })
  getFeeTypes(@Query('branchId') branchId?: string) {
    return this.feesService.getFeeTypes(branchId ? +branchId : undefined);
  }

  @Post('types')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN)
  @ForgeMessage('Fee type created')
  @ApiOperation({ summary: 'Create a fee type' })
  @ApiBody({ type: CreateFeeTypeDto })
  createFeeType(@Body() dto: CreateFeeTypeDto) {
    return this.feesService.createFeeType(dto);
  }

  @Get('groups')
  @ForgeMessage('Fee groups fetched')
  @ApiOperation({ summary: 'List fee groups' })
  @ApiQuery({ name: 'branchId', required: false, type: Number })
  @ApiQuery({ name: 'sessionId', required: false, type: Number })
  getFeeGroups(
    @Query('branchId') branchId?: string,
    @Query('sessionId') sessionId?: string,
  ) {
    return this.feesService.getFeeGroups(
      branchId ? +branchId : undefined,
      sessionId ? +sessionId : undefined,
    );
  }

  @Post('groups')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN, Role.ACCOUNTANT)
  @ForgeMessage('Fee group created')
  @ApiOperation({ summary: 'Create a fee group' })
  @ApiBody({ type: CreateFeeGroupDto })
  createFeeGroup(@Body() dto: CreateFeeGroupDto) {
    return this.feesService.createFeeGroup(dto);
  }

  @Post('allocate')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN, Role.ACCOUNTANT)
  @ForgeMessage('Fee allocated to student')
  @ApiOperation({ summary: 'Assign a fee group to a student' })
  allocateFee(@Body() dto: CreateFeeAllocationDto) {
    return this.feesService.allocateFee(dto);
  }

  @Get('student/:studentId')
  @Roles(
    Role.SUPER_ADMIN,
    Role.ADMIN,
    Role.ACCOUNTANT,
    Role.STUDENT,
    Role.PARENT,
  )
  @ForgeMessage('Student fee statement fetched')
  @ApiOperation({ summary: 'Get full fee statement for a student' })
  @ApiParam({ name: 'studentId', type: Number })
  @ApiQuery({ name: 'sessionId', required: true, type: Number })
  getStudentStatement(
    @Param('studentId', ParseIntIdPipe) studentId: number,
    @Query('sessionId') sessionId: string,
  ) {
    return this.feesService.getStudentFeeStatement(studentId, +sessionId);
  }

  @Post('collect')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN, Role.ACCOUNTANT)
  @ForgeMessage('Payment collected successfully')
  @ApiOperation({ summary: 'Record a fee payment' })
  collectPayment(@Body() dto: CollectPaymentDto, @CurrentUser() user: any) {
    return this.feesService.collectPayment(dto, user.id);
  }

  @Get('payment-history/:allocationId')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN, Role.ACCOUNTANT)
  @ForgeMessage('Payment history fetched')
  @ApiOperation({ summary: 'Get payment history for an allocation' })
  @ApiParam({ name: 'allocationId', type: Number })
  getPaymentHistory(
    @Param('allocationId', ParseIntIdPipe) allocationId: number,
  ) {
    return this.feesService.getPaymentHistory(allocationId);
  }

  // Fee Fines
  @Post('fines')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN, Role.ACCOUNTANT)
  @ForgeMessage('Fee fine configured')
  @ApiOperation({ summary: 'Configure a fine rule for a fee group/type' })
  @ApiBody({ type: CreateFeeFineDto })
  createFeeFine(@Body() dto: CreateFeeFineDto) {
    return this.feesService.createFeeFine(dto);
  }

  @Get('fines')
  @ForgeMessage('Fee fines fetched')
  @ApiOperation({ summary: 'List fee fine configurations' })
  @ApiQuery({ name: 'groupId', required: false, type: Number })
  @ApiQuery({ name: 'sessionId', required: false, type: Number })
  @ApiQuery({ name: 'branchId', required: false, type: Number })
  getFeeFines(
    @Query('groupId') groupId?: string,
    @Query('sessionId') sessionId?: string,
    @Query('branchId') branchId?: string,
  ) {
    return this.feesService.getFeeFines({
      groupId: groupId ? +groupId : undefined,
      sessionId: sessionId ? +sessionId : undefined,
      branchId: branchId ? +branchId : undefined,
    });
  }

  @Delete('fines/:id')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Remove a fee fine rule' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 204 })
  removeFeeFine(@Param('id', ParseIntIdPipe) id: number) {
    return this.feesService.removeFeeFine(id);
  }
}
