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
  ApiBody,
} from '@nestjs/swagger';
import { ForgeMessage } from 'nestjs-api-forge';
import { FeesService } from './fees.service';
import {
  CreateFeeAllocationDto,
  CollectPaymentDto,
} from './dto/create-payment.dto';
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
  @ApiBody({
    schema: {
      properties: {
        name: { type: 'string', example: 'Monthly Fee' },
        feeCode: { type: 'string', example: 'monthly-fee' },
        description: { type: 'string' },
        branchId: { type: 'number', example: 1 },
      },
      required: ['name', 'feeCode', 'branchId'],
    },
  })
  createFeeType(
    @Body()
    dto: {
      name: string;
      feeCode: string;
      description?: string;
      branchId: number;
    },
  ) {
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
  @ApiBody({
    schema: {
      properties: {
        name: { type: 'string', example: 'January - Six' },
        description: { type: 'string' },
        sessionId: { type: 'number', example: 6 },
        branchId: { type: 'number', example: 1 },
      },
      required: ['name', 'sessionId', 'branchId'],
    },
  })
  createFeeGroup(
    @Body()
    dto: {
      name: string;
      description?: string;
      sessionId: number;
      branchId: number;
    },
  ) {
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
}
