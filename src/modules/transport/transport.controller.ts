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
import { TransportService } from './transport.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '../../common/constants/roles.enum';
import { ParseIntIdPipe } from '../../common/pipes/parse-int-id.pipe';
import { CreateTransportRouteDto } from './dto/create-transport-route.dto';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { CreateStoppageDto } from './dto/create-stoppage.dto';
import { AssignStudentDto } from './dto/assign-student.dto';

@ApiTags('Transport')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('transport')
export class TransportController {
  constructor(private readonly transportService: TransportService) {}

  @Post('routes')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN)
  @ForgeMessage('Route created')
  @ApiOperation({ summary: 'Create a transport route' })
  @ApiBody({ type: CreateTransportRouteDto })
  createRoute(@Body() dto: CreateTransportRouteDto) {
    return this.transportService.createRoute(dto);
  }

  @Get('routes')
  @ForgeMessage('Routes fetched')
  @ApiOperation({ summary: 'List transport routes' })
  @ApiQuery({ name: 'branchId', required: false, type: Number })
  getRoutes(@Query('branchId') branchId?: string) {
    return this.transportService.getRoutes(branchId ? +branchId : undefined);
  }

  @Patch('routes/:id')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN)
  @ForgeMessage('Route updated')
  @ApiOperation({ summary: 'Update a route' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: CreateTransportRouteDto })
  updateRoute(
    @Param('id', ParseIntIdPipe) id: number,
    @Body() dto: CreateTransportRouteDto,
  ) {
    return this.transportService.updateRoute(id, dto);
  }

  @Delete('routes/:id')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a route' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 204 })
  removeRoute(@Param('id', ParseIntIdPipe) id: number) {
    return this.transportService.removeRoute(id);
  }

  @Post('vehicles')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN)
  @ForgeMessage('Vehicle created')
  @ApiOperation({ summary: 'Add a vehicle' })
  @ApiBody({ type: CreateVehicleDto })
  createVehicle(@Body() dto: CreateVehicleDto) {
    return this.transportService.createVehicle(dto);
  }

  @Get('vehicles')
  @ForgeMessage('Vehicles fetched')
  @ApiOperation({ summary: 'List vehicles' })
  @ApiQuery({ name: 'branchId', required: false, type: Number })
  getVehicles(@Query('branchId') branchId?: string) {
    return this.transportService.getVehicles(branchId ? +branchId : undefined);
  }

  @Patch('vehicles/:id')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN)
  @ForgeMessage('Vehicle updated')
  @ApiOperation({ summary: 'Update a vehicle' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: CreateVehicleDto })
  updateVehicle(
    @Param('id', ParseIntIdPipe) id: number,
    @Body() dto: CreateVehicleDto,
  ) {
    return this.transportService.updateVehicle(id, dto);
  }

  @Delete('vehicles/:id')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a vehicle' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 204 })
  removeVehicle(@Param('id', ParseIntIdPipe) id: number) {
    return this.transportService.removeVehicle(id);
  }

  @Post('stoppages')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN)
  @ForgeMessage('Stoppage created')
  @ApiOperation({ summary: 'Add a stoppage to a route' })
  @ApiBody({ type: CreateStoppageDto })
  createStoppage(@Body() dto: CreateStoppageDto) {
    return this.transportService.createStoppage(dto);
  }

  @Get('stoppages')
  @ForgeMessage('Stoppages fetched')
  @ApiOperation({ summary: 'List route stoppages' })
  @ApiQuery({ name: 'routeId', required: false, type: Number })
  @ApiQuery({ name: 'branchId', required: false, type: Number })
  getStoppages(
    @Query('routeId') routeId?: string,
    @Query('branchId') branchId?: string,
  ) {
    return this.transportService.getStoppages(
      routeId ? +routeId : undefined,
      branchId ? +branchId : undefined,
    );
  }

  @Patch('stoppages/:id')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN)
  @ForgeMessage('Stoppage updated')
  @ApiOperation({ summary: 'Update a stoppage' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: CreateStoppageDto })
  updateStoppage(
    @Param('id', ParseIntIdPipe) id: number,
    @Body() dto: CreateStoppageDto,
  ) {
    return this.transportService.updateStoppage(id, dto);
  }

  @Delete('stoppages/:id')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a stoppage' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 204 })
  removeStoppage(@Param('id', ParseIntIdPipe) id: number) {
    return this.transportService.removeStoppage(id);
  }

  @Post('assign')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN)
  @ForgeMessage('Student assigned to transport')
  @ApiOperation({ summary: 'Assign a student to a transport route' })
  @ApiBody({ type: AssignStudentDto })
  assignStudent(@Body() dto: AssignStudentDto) {
    return this.transportService.assignStudent(dto);
  }

  @Get('assignments')
  @ForgeMessage('Transport assignments fetched')
  @ApiOperation({ summary: 'List student transport assignments' })
  @ApiQuery({ name: 'studentId', required: false, type: Number })
  @ApiQuery({ name: 'routeId', required: false, type: Number })
  @ApiQuery({ name: 'branchId', required: false, type: Number })
  @ApiQuery({ name: 'sessionId', required: false, type: Number })
  getAssignments(
    @Query('studentId') studentId?: string,
    @Query('routeId') routeId?: string,
    @Query('branchId') branchId?: string,
    @Query('sessionId') sessionId?: string,
  ) {
    return this.transportService.getAssignments({
      studentId: studentId ? +studentId : undefined,
      routeId: routeId ? +routeId : undefined,
      branchId: branchId ? +branchId : undefined,
      sessionId: sessionId ? +sessionId : undefined,
    });
  }

  @Delete('assignments/:id')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Remove a transport assignment' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 204 })
  removeAssignment(@Param('id', ParseIntIdPipe) id: number) {
    return this.transportService.removeAssignment(id);
  }
}
