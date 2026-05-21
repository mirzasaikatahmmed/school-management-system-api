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
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { ParseIntIdPipe } from '../../common/pipes/parse-int-id.pipe';
import { CreateVisitorDto } from './dto/create-visitor.dto';
import { CreatePostalDto } from './dto/create-postal.dto';
import { CreateComplaintDto } from './dto/create-complaint.dto';
import { CreateCallLogDto } from './dto/create-call-log.dto';
import { CreateEnquiryDto } from './dto/create-enquiry.dto';

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
  @ApiBody({ type: CreateVisitorDto })
  createVisitor(@Body() dto: CreateVisitorDto) {
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
  @ApiBody({ type: CreateVisitorDto })
  updateVisitor(@Param('id', ParseIntIdPipe) id: number, @Body() dto: CreateVisitorDto) {
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
  @ApiBody({ type: CreatePostalDto })
  createPostal(@Body() dto: CreatePostalDto) {
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
  @ApiBody({ type: CreateComplaintDto })
  createComplaint(@Body() dto: CreateComplaintDto) {
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
  @ApiBody({ type: CreateComplaintDto })
  updateComplaint(@Param('id', ParseIntIdPipe) id: number, @Body() dto: CreateComplaintDto) {
    return this.service.updateComplaint(id, dto);
  }

  // Call Logs
  @Post('call-logs')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN, Role.RECEPTIONIST)
  @ForgeMessage('Call logged')
  @ApiOperation({ summary: 'Log a phone call (incoming or outgoing)' })
  @ApiBody({ type: CreateCallLogDto })
  createCallLog(@Body() dto: CreateCallLogDto, @CurrentUser() user: any) {
    return this.service.createCallLog(dto, user.id);
  }

  @Get('call-logs')
  @ForgeMessage('Call logs fetched')
  @ApiOperation({ summary: 'List call logs' })
  @ApiQuery({ name: 'callType', required: false, type: String, description: 'incoming | outgoing' })
  @ApiQuery({ name: 'fromDate', required: false, type: String })
  @ApiQuery({ name: 'toDate', required: false, type: String })
  @ApiQuery({ name: 'branchId', required: false, type: Number })
  getCallLogs(
    @Query('callType') callType?: string,
    @Query('fromDate') fromDate?: string,
    @Query('toDate') toDate?: string,
    @Query('branchId') branchId?: string,
  ) {
    return this.service.getCallLogs({
      callType,
      fromDate,
      toDate,
      branchId: branchId ? +branchId : undefined,
    });
  }

  @Patch('call-logs/:id')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN, Role.RECEPTIONIST)
  @ForgeMessage('Call log updated')
  @ApiOperation({ summary: 'Update a call log' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: CreateCallLogDto })
  updateCallLog(@Param('id', ParseIntIdPipe) id: number, @Body() dto: CreateCallLogDto) {
    return this.service.updateCallLog(id, dto);
  }

  @Delete('call-logs/:id')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a call log' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 204 })
  removeCallLog(@Param('id', ParseIntIdPipe) id: number) {
    return this.service.removeCallLog(id);
  }

  // Enquiries
  @Post('enquiries')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN, Role.RECEPTIONIST)
  @ForgeMessage('Enquiry registered')
  @ApiOperation({ summary: 'Create an admission enquiry' })
  @ApiBody({ type: CreateEnquiryDto })
  createEnquiry(@Body() dto: CreateEnquiryDto, @CurrentUser() user: any) {
    return this.service.createEnquiry(dto, user.id);
  }

  @Get('enquiries')
  @ForgeMessage('Enquiries fetched')
  @ApiOperation({ summary: 'List admission enquiries' })
  @ApiQuery({ name: 'status', required: false, type: String, description: 'active | partially_closed | missed | closed' })
  @ApiQuery({ name: 'classId', required: false, type: Number })
  @ApiQuery({ name: 'branchId', required: false, type: Number })
  getEnquiries(
    @Query('status') status?: string,
    @Query('classId') classId?: string,
    @Query('branchId') branchId?: string,
  ) {
    return this.service.getEnquiries({
      status,
      classId: classId ? +classId : undefined,
      branchId: branchId ? +branchId : undefined,
    });
  }

  @Get('enquiries/:id')
  @ForgeMessage('Enquiry fetched')
  @ApiOperation({ summary: 'Get enquiry by ID' })
  @ApiParam({ name: 'id', type: Number })
  findEnquiry(@Param('id', ParseIntIdPipe) id: number) {
    return this.service.findEnquiry(id);
  }

  @Patch('enquiries/:id')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN, Role.RECEPTIONIST)
  @ForgeMessage('Enquiry updated')
  @ApiOperation({ summary: 'Update an enquiry (status, notes, etc.)' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: CreateEnquiryDto })
  updateEnquiry(@Param('id', ParseIntIdPipe) id: number, @Body() dto: CreateEnquiryDto) {
    return this.service.updateEnquiry(id, dto);
  }

  @Delete('enquiries/:id')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete an enquiry' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 204 })
  removeEnquiry(@Param('id', ParseIntIdPipe) id: number) {
    return this.service.removeEnquiry(id);
  }
}
