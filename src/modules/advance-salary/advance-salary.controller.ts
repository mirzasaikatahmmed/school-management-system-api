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
  ApiBody,
} from '@nestjs/swagger';
import { ForgeMessage } from 'nestjs-api-forge';
import { AdvanceSalaryService } from './advance-salary.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '../../common/constants/roles.enum';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { ParseIntIdPipe } from '../../common/pipes/parse-int-id.pipe';

@ApiTags('Advance Salary')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('advance-salary')
export class AdvanceSalaryController {
  constructor(private readonly service: AdvanceSalaryService) {}

  @Post()
  @ForgeMessage('Advance salary requested')
  @ApiOperation({ summary: 'Apply for advance salary' })
  @ApiBody({
    schema: {
      properties: {
        amount: { type: 'number', example: 5000 },
        reason: { type: 'string', example: 'Medical emergency' },
        branchId: { type: 'number', example: 1 },
      },
      required: ['amount'],
    },
  })
  apply(@Body() dto: any, @CurrentUser() user: any) {
    return this.service.apply(dto, user.id);
  }

  @Get()
  @ForgeMessage('Advance salary requests fetched')
  @ApiOperation({ summary: 'List advance salary requests' })
  @ApiQuery({ name: 'staffId', required: false, type: Number })
  @ApiQuery({
    name: 'status',
    required: false,
    type: String,
    description: 'pending | approved | rejected | paid',
  })
  @ApiQuery({ name: 'branchId', required: false, type: Number })
  getAll(
    @Query('staffId') staffId?: string,
    @Query('status') status?: string,
    @Query('branchId') branchId?: string,
  ) {
    return this.service.getAll({
      staffId: staffId ? +staffId : undefined,
      status,
      branchId: branchId ? +branchId : undefined,
    });
  }

  @Patch(':id/approve')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN)
  @ForgeMessage('Advance salary approved')
  @ApiOperation({ summary: 'Approve an advance salary request' })
  @ApiParam({ name: 'id', type: Number })
  approve(@Param('id', ParseIntIdPipe) id: number, @CurrentUser() user: any) {
    return this.service.approve(id, user.id);
  }

  @Patch(':id/reject')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN)
  @ForgeMessage('Advance salary rejected')
  @ApiOperation({ summary: 'Reject an advance salary request' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ schema: { properties: { rejectionReason: { type: 'string' } } } })
  reject(
    @Param('id', ParseIntIdPipe) id: number,
    @Body() body: any,
    @CurrentUser() user: any,
  ) {
    return this.service.reject(id, body.rejectionReason, user.id);
  }

  @Patch(':id/pay')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN, Role.ACCOUNTANT)
  @ForgeMessage('Advance salary marked as paid')
  @ApiOperation({ summary: 'Mark advance salary as paid' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({
    schema: {
      properties: { paymentDate: { type: 'string', example: '2025-05-10' } },
      required: ['paymentDate'],
    },
  })
  markPaid(@Param('id', ParseIntIdPipe) id: number, @Body() body: any) {
    return this.service.markPaid(id, body.paymentDate);
  }
}
