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
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
  ApiQuery,
  ApiBody,
} from '@nestjs/swagger';
import { ForgeMessage } from 'nestjs-api-forge';
import { StaffService } from './staff.service';
import { CreateStaffDto } from './dto/create-staff.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '../../common/constants/roles.enum';
import { ParseIntIdPipe } from '../../common/pipes/parse-int-id.pipe';

@ApiTags('Staff')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('staff')
export class StaffController {
  constructor(private readonly staffService: StaffService) {}

  @Post()
  @Roles(Role.SUPER_ADMIN, Role.ADMIN)
  @ForgeMessage('Staff created successfully')
  @ApiOperation({ summary: 'Add a new staff member' })
  create(@Body() dto: CreateStaffDto) {
    return this.staffService.create(dto);
  }

  @Get()
  @Roles(Role.SUPER_ADMIN, Role.ADMIN)
  @ForgeMessage('Staff list fetched')
  @ApiOperation({ summary: 'List all staff members' })
  @ApiQuery({ name: 'branchId', required: false, type: Number })
  @ApiQuery({ name: 'search', required: false, type: String })
  findAll(
    @Query('branchId') branchId?: string,
    @Query('search') search?: string,
  ) {
    return this.staffService.findAll(branchId ? +branchId : undefined, search);
  }

  @Get(':id')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN)
  @ForgeMessage('Staff member fetched')
  @ApiOperation({ summary: 'Get staff by ID' })
  @ApiParam({ name: 'id', type: Number })
  findOne(@Param('id', ParseIntIdPipe) id: number) {
    return this.staffService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN)
  @ForgeMessage('Staff updated successfully')
  @ApiOperation({ summary: 'Update staff details' })
  @ApiParam({ name: 'id', type: Number })
  update(@Param('id', ParseIntIdPipe) id: number, @Body() dto: CreateStaffDto) {
    return this.staffService.update(id, dto);
  }

  @Delete(':id')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a staff member' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 204 })
  remove(@Param('id', ParseIntIdPipe) id: number) {
    return this.staffService.remove(id);
  }

  @Get('departments/list')
  @ForgeMessage('Departments fetched')
  @ApiOperation({ summary: 'List staff departments' })
  @ApiQuery({ name: 'branchId', required: false, type: Number })
  getDepartments(@Query('branchId') branchId?: string) {
    return this.staffService.getDepartments(branchId ? +branchId : undefined);
  }

  @Post('departments')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN)
  @ForgeMessage('Department created')
  @ApiOperation({ summary: 'Create a department' })
  @ApiBody({
    schema: {
      properties: {
        name: { type: 'string', example: 'Science' },
        branchId: { type: 'number', example: 1 },
      },
      required: ['name'],
    },
  })
  createDepartment(
    @Body('name') name: string,
    @Body('branchId') branchId?: number,
  ) {
    return this.staffService.createDepartment(name, branchId);
  }

  @Delete('departments/:id')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a department' })
  @ApiParam({ name: 'id', type: Number })
  removeDepartment(@Param('id', ParseIntIdPipe) id: number) {
    return this.staffService.removeDepartment(id);
  }

  @Get('designations/list')
  @ForgeMessage('Designations fetched')
  @ApiOperation({ summary: 'List staff designations' })
  @ApiQuery({ name: 'branchId', required: false, type: Number })
  getDesignations(@Query('branchId') branchId?: string) {
    return this.staffService.getDesignations(branchId ? +branchId : undefined);
  }

  @Post('designations')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN)
  @ForgeMessage('Designation created')
  @ApiOperation({ summary: 'Create a designation' })
  @ApiBody({
    schema: {
      properties: {
        name: { type: 'string', example: 'Head Teacher' },
        branchId: { type: 'number', example: 1 },
      },
      required: ['name'],
    },
  })
  createDesignation(
    @Body('name') name: string,
    @Body('branchId') branchId?: number,
  ) {
    return this.staffService.createDesignation(name, branchId);
  }

  @Delete('designations/:id')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a designation' })
  @ApiParam({ name: 'id', type: Number })
  removeDesignation(@Param('id', ParseIntIdPipe) id: number) {
    return this.staffService.removeDesignation(id);
  }
}
