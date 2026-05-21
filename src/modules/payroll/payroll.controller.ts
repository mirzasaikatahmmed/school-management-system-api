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
import { PayrollService } from './payroll.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '../../common/constants/roles.enum';
import { ParseIntIdPipe } from '../../common/pipes/parse-int-id.pipe';
import { CreateSalaryTemplateDto } from './dto/create-salary-template.dto';
import { AddTemplateDetailDto } from './dto/add-template-detail.dto';
import { GeneratePayrollDto } from './dto/generate-payroll.dto';
import { PayPayrollDto } from './dto/pay-payroll.dto';

@ApiTags('Payroll')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('payroll')
export class PayrollController {
  constructor(private readonly service: PayrollService) {}

  @Post('templates')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN)
  @ForgeMessage('Salary template created')
  @ApiOperation({ summary: 'Create a salary template' })
  @ApiBody({ type: CreateSalaryTemplateDto })
  createTemplate(@Body() dto: CreateSalaryTemplateDto) {
    return this.service.createTemplate(dto);
  }

  @Get('templates')
  @ForgeMessage('Salary templates fetched')
  @ApiOperation({ summary: 'List salary templates' })
  @ApiQuery({ name: 'branchId', required: false, type: Number })
  getTemplates(@Query('branchId') branchId?: string) {
    return this.service.getTemplates(branchId ? +branchId : undefined);
  }

  @Patch('templates/:id')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN)
  @ForgeMessage('Template updated')
  @ApiOperation({ summary: 'Update a salary template' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: CreateSalaryTemplateDto })
  updateTemplate(@Param('id', ParseIntIdPipe) id: number, @Body() dto: CreateSalaryTemplateDto) {
    return this.service.updateTemplate(id, dto);
  }

  @Delete('templates/:id')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a salary template' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 204 })
  removeTemplate(@Param('id', ParseIntIdPipe) id: number) {
    return this.service.removeTemplate(id);
  }

  @Post('templates/:id/details')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN)
  @ForgeMessage('Template detail added')
  @ApiOperation({ summary: 'Add allowance/deduction detail to template' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: AddTemplateDetailDto })
  addDetail(@Param('id', ParseIntIdPipe) id: number, @Body() dto: AddTemplateDetailDto) {
    return this.service.addTemplateDetail({ ...dto, templateId: id });
  }

  @Get('templates/:id/details')
  @ForgeMessage('Template details fetched')
  @ApiOperation({ summary: 'Get template allowances/deductions' })
  @ApiParam({ name: 'id', type: Number })
  getDetails(@Param('id', ParseIntIdPipe) id: number) {
    return this.service.getTemplateDetails(id);
  }

  @Delete('templates/details/:id')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Remove a template detail' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 204 })
  removeDetail(@Param('id', ParseIntIdPipe) id: number) {
    return this.service.removeTemplateDetail(id);
  }

  @Post('generate')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN, Role.ACCOUNTANT)
  @ForgeMessage('Payroll generated')
  @ApiOperation({ summary: 'Generate payroll for a staff member' })
  @ApiBody({ type: GeneratePayrollDto })
  generatePayroll(@Body() dto: GeneratePayrollDto) {
    return this.service.generatePayroll(dto);
  }

  @Get('list')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN, Role.ACCOUNTANT)
  @ForgeMessage('Payroll list fetched')
  @ApiOperation({ summary: 'List payroll records' })
  @ApiQuery({ name: 'staffId', required: false, type: Number })
  @ApiQuery({ name: 'month', required: false, type: Number })
  @ApiQuery({ name: 'year', required: false, type: Number })
  @ApiQuery({ name: 'branchId', required: false, type: Number })
  @ApiQuery({ name: 'sessionId', required: false, type: Number })
  getPayrolls(
    @Query('staffId') staffId?: string,
    @Query('month') month?: string,
    @Query('year') year?: string,
    @Query('branchId') branchId?: string,
    @Query('sessionId') sessionId?: string,
  ) {
    return this.service.getPayrolls({
      staffId: staffId ? +staffId : undefined,
      month: month ? +month : undefined,
      year: year ? +year : undefined,
      branchId: branchId ? +branchId : undefined,
      sessionId: sessionId ? +sessionId : undefined,
    });
  }

  @Patch(':id/pay')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN, Role.ACCOUNTANT)
  @ForgeMessage('Payroll payment processed')
  @ApiOperation({ summary: 'Mark payroll as paid' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: PayPayrollDto })
  payPayroll(@Param('id', ParseIntIdPipe) id: number, @Body() dto: PayPayrollDto) {
    return this.service.payPayroll(id, dto);
  }
}
