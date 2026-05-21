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
import { HostelService } from './hostel.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '../../common/constants/roles.enum';
import { ParseIntIdPipe } from '../../common/pipes/parse-int-id.pipe';
import { CreateHostelDto } from './dto/create-hostel.dto';
import { CreateHostelRoomDto } from './dto/create-hostel-room.dto';
import { CreateHostelCategoryDto } from './dto/create-hostel-category.dto';
import { AllocateStudentDto } from './dto/allocate-student.dto';

@ApiTags('Hostel')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('hostel')
export class HostelController {
  constructor(private readonly hostelService: HostelService) {}

  @Post()
  @Roles(Role.SUPER_ADMIN, Role.ADMIN)
  @ForgeMessage('Hostel created')
  @ApiOperation({ summary: 'Create a hostel' })
  @ApiBody({ type: CreateHostelDto })
  createHostel(@Body() dto: CreateHostelDto) {
    return this.hostelService.createHostel(dto);
  }

  @Get()
  @ForgeMessage('Hostels fetched')
  @ApiOperation({ summary: 'List all hostels' })
  @ApiQuery({ name: 'branchId', required: false, type: Number })
  getHostels(@Query('branchId') branchId?: string) {
    return this.hostelService.getHostels(branchId ? +branchId : undefined);
  }

  @Patch(':id')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN)
  @ForgeMessage('Hostel updated')
  @ApiOperation({ summary: 'Update a hostel' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: CreateHostelDto })
  updateHostel(
    @Param('id', ParseIntIdPipe) id: number,
    @Body() dto: CreateHostelDto,
  ) {
    return this.hostelService.updateHostel(id, dto);
  }

  @Delete(':id')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a hostel' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 204 })
  removeHostel(@Param('id', ParseIntIdPipe) id: number) {
    return this.hostelService.removeHostel(id);
  }

  @Post('rooms')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN)
  @ForgeMessage('Room created')
  @ApiOperation({ summary: 'Create a hostel room' })
  @ApiBody({ type: CreateHostelRoomDto })
  createRoom(@Body() dto: CreateHostelRoomDto) {
    return this.hostelService.createRoom(dto);
  }

  @Get('rooms')
  @ForgeMessage('Rooms fetched')
  @ApiOperation({ summary: 'List hostel rooms' })
  @ApiQuery({ name: 'hostelId', required: false, type: Number })
  @ApiQuery({ name: 'branchId', required: false, type: Number })
  getRooms(
    @Query('hostelId') hostelId?: string,
    @Query('branchId') branchId?: string,
  ) {
    return this.hostelService.getRooms(
      hostelId ? +hostelId : undefined,
      branchId ? +branchId : undefined,
    );
  }

  @Patch('rooms/:id')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN)
  @ForgeMessage('Room updated')
  @ApiOperation({ summary: 'Update a room' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: CreateHostelRoomDto })
  updateRoom(
    @Param('id', ParseIntIdPipe) id: number,
    @Body() dto: CreateHostelRoomDto,
  ) {
    return this.hostelService.updateRoom(id, dto);
  }

  @Delete('rooms/:id')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a room' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 204 })
  removeRoom(@Param('id', ParseIntIdPipe) id: number) {
    return this.hostelService.removeRoom(id);
  }

  @Post('categories')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN)
  @ForgeMessage('Hostel category created')
  @ApiOperation({ summary: 'Create a hostel category' })
  @ApiBody({ type: CreateHostelCategoryDto })
  createCategory(@Body() dto: CreateHostelCategoryDto) {
    return this.hostelService.createCategory(dto);
  }

  @Get('categories')
  @ForgeMessage('Hostel categories fetched')
  @ApiOperation({ summary: 'List hostel categories' })
  @ApiQuery({ name: 'branchId', required: false, type: Number })
  getCategories(@Query('branchId') branchId?: string) {
    return this.hostelService.getCategories(branchId ? +branchId : undefined);
  }

  @Delete('categories/:id')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a hostel category' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 204 })
  removeCategory(@Param('id', ParseIntIdPipe) id: number) {
    return this.hostelService.removeCategory(id);
  }

  @Post('allocations')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN)
  @ForgeMessage('Student allocated to hostel room')
  @ApiOperation({ summary: 'Allocate a student to a hostel room' })
  @ApiBody({ type: AllocateStudentDto })
  allocate(@Body() dto: AllocateStudentDto) {
    return this.hostelService.allocate(dto);
  }

  @Get('allocations')
  @ForgeMessage('Hostel allocations fetched')
  @ApiOperation({ summary: 'List hostel allocations' })
  @ApiQuery({ name: 'studentId', required: false, type: Number })
  @ApiQuery({ name: 'hostelId', required: false, type: Number })
  @ApiQuery({ name: 'roomId', required: false, type: Number })
  @ApiQuery({ name: 'branchId', required: false, type: Number })
  @ApiQuery({ name: 'sessionId', required: false, type: Number })
  getAllocations(
    @Query('studentId') studentId?: string,
    @Query('hostelId') hostelId?: string,
    @Query('roomId') roomId?: string,
    @Query('branchId') branchId?: string,
    @Query('sessionId') sessionId?: string,
  ) {
    return this.hostelService.getAllocations({
      studentId: studentId ? +studentId : undefined,
      hostelId: hostelId ? +hostelId : undefined,
      roomId: roomId ? +roomId : undefined,
      branchId: branchId ? +branchId : undefined,
      sessionId: sessionId ? +sessionId : undefined,
    });
  }

  @Delete('allocations/:id')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Remove a hostel allocation' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 204 })
  removeAllocation(@Param('id', ParseIntIdPipe) id: number) {
    return this.hostelService.removeAllocation(id);
  }
}
