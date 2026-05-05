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
import { AccountingService } from './accounting.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '../../common/constants/roles.enum';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { ParseIntIdPipe } from '../../common/pipes/parse-int-id.pipe';

@ApiTags('Accounting')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('accounting')
export class AccountingController {
  constructor(private readonly service: AccountingService) {}

  // Accounts
  @Post('accounts')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN, Role.ACCOUNTANT)
  @ForgeMessage('Account created')
  @ApiOperation({ summary: 'Create an account' })
  @ApiBody({
    schema: {
      properties: {
        accountName: { type: 'string', example: 'Cash in Hand' },
        accountNo: { type: 'string' },
        accountType: { type: 'string', example: 'cash' },
        openingBalance: { type: 'number', example: 0 },
        branchId: { type: 'number', example: 1 },
      },
      required: ['accountName'],
    },
  })
  createAccount(@Body() dto: any) {
    return this.service.createAccount(dto);
  }

  @Get('accounts')
  @ForgeMessage('Accounts fetched')
  @ApiOperation({ summary: 'List accounts' })
  @ApiQuery({ name: 'branchId', required: false, type: Number })
  getAccounts(@Query('branchId') branchId?: string) {
    return this.service.getAccounts(branchId ? +branchId : undefined);
  }

  @Patch('accounts/:id')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN, Role.ACCOUNTANT)
  @ForgeMessage('Account updated')
  @ApiOperation({ summary: 'Update an account' })
  @ApiParam({ name: 'id', type: Number })
  updateAccount(@Param('id', ParseIntIdPipe) id: number, @Body() dto: any) {
    return this.service.updateAccount(id, dto);
  }

  @Delete('accounts/:id')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete an account' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 204 })
  removeAccount(@Param('id', ParseIntIdPipe) id: number) {
    return this.service.removeAccount(id);
  }

  // Voucher Heads
  @Post('voucher-heads')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN, Role.ACCOUNTANT)
  @ForgeMessage('Voucher head created')
  @ApiOperation({ summary: 'Create a voucher head' })
  @ApiBody({
    schema: {
      properties: {
        name: { type: 'string', example: 'School Fee' },
        description: { type: 'string' },
        branchId: { type: 'number', example: 1 },
      },
      required: ['name'],
    },
  })
  createVoucherHead(@Body() dto: any) {
    return this.service.createVoucherHead(dto);
  }

  @Get('voucher-heads')
  @ForgeMessage('Voucher heads fetched')
  @ApiOperation({ summary: 'List voucher heads' })
  @ApiQuery({ name: 'branchId', required: false, type: Number })
  getVoucherHeads(@Query('branchId') branchId?: string) {
    return this.service.getVoucherHeads(branchId ? +branchId : undefined);
  }

  @Patch('voucher-heads/:id')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN, Role.ACCOUNTANT)
  @ForgeMessage('Voucher head updated')
  @ApiOperation({ summary: 'Update a voucher head' })
  @ApiParam({ name: 'id', type: Number })
  updateVoucherHead(@Param('id', ParseIntIdPipe) id: number, @Body() dto: any) {
    return this.service.updateVoucherHead(id, dto);
  }

  @Delete('voucher-heads/:id')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a voucher head' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 204 })
  removeVoucherHead(@Param('id', ParseIntIdPipe) id: number) {
    return this.service.removeVoucherHead(id);
  }

  // Transactions
  @Post('transactions')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN, Role.ACCOUNTANT)
  @ForgeMessage('Transaction recorded')
  @ApiOperation({ summary: 'Record a deposit or expense transaction' })
  @ApiBody({
    schema: {
      properties: {
        accountId: { type: 'number', example: 1 },
        voucherHeadId: { type: 'number', example: 1 },
        transactionType: {
          type: 'string',
          enum: ['debit', 'credit'],
          example: 'credit',
        },
        amount: { type: 'number', example: 5000 },
        description: { type: 'string', example: 'Monthly salary' },
        referenceNo: { type: 'string' },
        transactionDate: { type: 'string', example: '2025-05-01' },
        branchId: { type: 'number', example: 1 },
        sessionId: { type: 'number', example: 6 },
      },
      required: ['accountId', 'transactionType', 'amount', 'transactionDate'],
    },
  })
  createTransaction(@Body() dto: any, @CurrentUser() user: any) {
    return this.service.createTransaction(dto, user.id);
  }

  @Get('transactions')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN, Role.ACCOUNTANT)
  @ForgeMessage('Transactions fetched')
  @ApiOperation({ summary: 'List transactions with filters' })
  @ApiQuery({ name: 'accountId', required: false, type: Number })
  @ApiQuery({ name: 'branchId', required: false, type: Number })
  @ApiQuery({ name: 'sessionId', required: false, type: Number })
  @ApiQuery({ name: 'fromDate', required: false, type: String })
  @ApiQuery({ name: 'toDate', required: false, type: String })
  getTransactions(
    @Query('accountId') accountId?: string,
    @Query('branchId') branchId?: string,
    @Query('sessionId') sessionId?: string,
    @Query('fromDate') fromDate?: string,
    @Query('toDate') toDate?: string,
  ) {
    return this.service.getTransactions({
      accountId: accountId ? +accountId : undefined,
      branchId: branchId ? +branchId : undefined,
      sessionId: sessionId ? +sessionId : undefined,
      fromDate,
      toDate,
    });
  }

  @Get('balance-sheet')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN, Role.ACCOUNTANT)
  @ForgeMessage('Balance sheet fetched')
  @ApiOperation({ summary: 'Get balance sheet' })
  @ApiQuery({ name: 'branchId', required: false, type: Number })
  getBalanceSheet(@Query('branchId') branchId?: string) {
    return this.service.getBalanceSheet(branchId ? +branchId : undefined);
  }

  @Get('income-expense-report')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN, Role.ACCOUNTANT)
  @ForgeMessage('Income/Expense report fetched')
  @ApiOperation({ summary: 'Get income and expense report' })
  @ApiQuery({ name: 'branchId', required: false, type: Number })
  @ApiQuery({ name: 'sessionId', required: false, type: Number })
  @ApiQuery({ name: 'fromDate', required: false, type: String })
  @ApiQuery({ name: 'toDate', required: false, type: String })
  getIncomeExpenseReport(
    @Query('branchId') branchId?: string,
    @Query('sessionId') sessionId?: string,
    @Query('fromDate') fromDate?: string,
    @Query('toDate') toDate?: string,
  ) {
    return this.service.getIncomeExpenseReport({
      branchId: branchId ? +branchId : undefined,
      sessionId: sessionId ? +sessionId : undefined,
      fromDate,
      toDate,
    });
  }
}
