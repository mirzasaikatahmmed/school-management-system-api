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
import { ReceptionService } from './reception.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '../../common/constants/roles.enum';
import { ParseIntIdPipe } from '../../common/pipes/parse-int-id.pipe';

@ApiTags('Reception')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('reception')
export class ReceptionController {
  constructor(private readonly service: ReceptionService) {}

  @Post('visitors')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN, Role.RECEPTIONIST)
  @ForgeMessage('Visitor logged')
  @ApiOperation({ summary: 'Log a visitor' })
  @ApiBody({
    schema: {
      properties: {
        name: { type: 'string', example: 'Karim Ali' },
        phone: { type: 'string' },
        toMeet: { type: 'string', example: 'Principal' },
        purpose: { type: 'string', example: 'Admission enquiry' },
        inTime: { type: 'string', example: '10:30' },
        visitDate: { type: 'string', example: '2025-05-05' },
        branchId: { type: 'number', example: 1 },
      },
      required: ['name', 'toMeet', 'visitDate'],
    },
  })
  createVisitor(@Body() dto: any) {
    return this.service.createVisitor(dto);
  }

  @Get('visitors')
  @ForgeMessage('Visitor logs fetched')
  @ApiOperation({ summary: 'List visitor logs' })
  @ApiQuery({ name: 'branchId', required: false, type: Number })
  @ApiQuery({ name: 'fromDate', required: false, type: String })
  @ApiQuery({ name: 'toDate', required: false, type: String })
  getVisitors(
    @Query('branchId') branchId?: string,
    @Query('fromDate') fromDate?: string,
    @Query('toDate') toDate?: string,
  ) {
    return this.service.getVisitors({
      branchId: branchId ? +branchId : undefined,
      fromDate,
      toDate,
    });
  }

  @Patch('visitors/:id')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN, Role.RECEPTIONIST)
  @ForgeMessage('Visitor log updated')
  @ApiOperation({ summary: 'Update visitor log (e.g., set out time)' })
  @ApiParam({ name: 'id', type: Number })
  updateVisitor(@Param('id', ParseIntIdPipe) id: number, @Body() dto: any) {
    return this.service.updateVisitor(id, dto);
  }

  @Delete('visitors/:id')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a visitor log' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 204 })
  removeVisitor(@Param('id', ParseIntIdPipe) id: number) {
    return this.service.removeVisitor(id);
  }

  @Post('postal')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN, Role.RECEPTIONIST)
  @ForgeMessage('Postal record created')
  @ApiOperation({ summary: 'Add a postal record (receive/dispatch)' })
  @ApiBody({
    schema: {
      properties: {
        type: {
          type: 'string',
          enum: ['receive', 'dispatch'],
          example: 'receive',
        },
        from: { type: 'string', example: 'Ministry of Education' },
        to: { type: 'string', example: 'Principal' },
        referenceNo: { type: 'string' },
        subject: { type: 'string' },
        postalDate: { type: 'string', example: '2025-05-01' },
        note: { type: 'string' },
        branchId: { type: 'number', example: 1 },
      },
      required: ['type', 'from', 'to', 'postalDate'],
    },
  })
  createPostal(@Body() dto: any) {
    return this.service.createPostal(dto);
  }

  @Get('postal')
  @ForgeMessage('Postal records fetched')
  @ApiOperation({ summary: 'List postal records' })
  @ApiQuery({
    name: 'type',
    required: false,
    type: String,
    description: 'receive | dispatch',
  })
  @ApiQuery({ name: 'branchId', required: false, type: Number })
  getPostals(
    @Query('type') type?: string,
    @Query('branchId') branchId?: string,
  ) {
    return this.service.getPostals({
      type,
      branchId: branchId ? +branchId : undefined,
    });
  }

  @Delete('postal/:id')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a postal record' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 204 })
  removePostal(@Param('id', ParseIntIdPipe) id: number) {
    return this.service.removePostal(id);
  }

  @Post('complaints')
  @ForgeMessage('Complaint registered')
  @ApiOperation({ summary: 'Register a complaint' })
  @ApiBody({
    schema: {
      properties: {
        complainant: { type: 'string', example: 'Parent Name' },
        phone: { type: 'string' },
        subject: { type: 'string', example: 'Bus delay' },
        description: { type: 'string' },
        complaintDate: { type: 'string', example: '2025-05-01' },
        branchId: { type: 'number', example: 1 },
      },
      required: ['complainant', 'subject', 'complaintDate'],
    },
  })
  createComplaint(@Body() dto: any) {
    return this.service.createComplaint(dto);
  }

  @Get('complaints')
  @ForgeMessage('Complaints fetched')
  @ApiOperation({ summary: 'List complaints' })
  @ApiQuery({
    name: 'status',
    required: false,
    type: String,
    description: 'open | closed',
  })
  @ApiQuery({ name: 'branchId', required: false, type: Number })
  getComplaints(
    @Query('status') status?: string,
    @Query('branchId') branchId?: string,
  ) {
    return this.service.getComplaints({
      status,
      branchId: branchId ? +branchId : undefined,
    });
  }

  @Patch('complaints/:id')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN, Role.RECEPTIONIST)
  @ForgeMessage('Complaint updated')
  @ApiOperation({ summary: 'Update complaint status/action' })
  @ApiParam({ name: 'id', type: Number })
  updateComplaint(@Param('id', ParseIntIdPipe) id: number, @Body() dto: any) {
    return this.service.updateComplaint(id, dto);
  }
}
