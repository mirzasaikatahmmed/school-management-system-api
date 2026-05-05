import { Controller, Get, Post, Body, UseGuards, Query } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiQuery,
} from '@nestjs/swagger';
import { ForgeMessage } from 'nestjs-api-forge';
import { AdmissionService } from './admission.service';
import { CreateAdmissionDto } from './dto/create-admission.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '../../common/constants/roles.enum';

@ApiTags('Admission')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('admission')
export class AdmissionController {
  constructor(private readonly service: AdmissionService) {}

  @Post()
  @Roles(Role.SUPER_ADMIN, Role.ADMIN)
  @ForgeMessage('Student admitted successfully')
  @ApiOperation({
    summary: 'Create full student admission',
    description:
      'Single endpoint that: creates guardian (or links existing), creates student, ' +
      'hashes and stores login credentials for both student and guardian, creates enrollment, ' +
      'and optionally assigns transport route and hostel room — all in one transaction.',
  })
  createAdmission(@Body() dto: CreateAdmissionDto) {
    return this.service.createAdmission(dto);
  }

  @Get()
  @Roles(Role.SUPER_ADMIN, Role.ADMIN, Role.TEACHER)
  @ForgeMessage('Admissions fetched')
  @ApiOperation({ summary: 'List admitted students with optional filters' })
  @ApiQuery({ name: 'branchId', required: false, type: Number })
  @ApiQuery({
    name: 'sessionId',
    required: false,
    type: Number,
    description: 'Filter by academic session',
  })
  @ApiQuery({ name: 'classId', required: false, type: Number })
  @ApiQuery({ name: 'sectionId', required: false, type: Number })
  @ApiQuery({
    name: 'search',
    required: false,
    type: String,
    description: 'Search by name, register no, or mobile',
  })
  getAdmissions(
    @Query('branchId') branchId?: string,
    @Query('sessionId') sessionId?: string,
    @Query('classId') classId?: string,
    @Query('sectionId') sectionId?: string,
    @Query('search') search?: string,
  ) {
    return this.service.getAdmissions({
      branchId: branchId ? +branchId : undefined,
      sessionId: sessionId ? +sessionId : undefined,
      classId: classId ? +classId : undefined,
      sectionId: sectionId ? +sectionId : undefined,
      search,
    });
  }
}
