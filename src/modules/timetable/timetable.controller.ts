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
import { TimetableService } from './timetable.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '../../common/constants/roles.enum';
import { ParseIntIdPipe } from '../../common/pipes/parse-int-id.pipe';
import { CreateTimetableDto } from './dto/create-timetable.dto';
import { CreateExamTimetableDto } from './dto/create-exam-timetable.dto';

@ApiTags('Timetable')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('timetable')
export class TimetableController {
  constructor(private readonly service: TimetableService) {}

  @Post()
  @Roles(Role.SUPER_ADMIN, Role.ADMIN)
  @ForgeMessage('Timetable entry created')
  @ApiOperation({ summary: 'Add a class timetable entry' })
  @ApiBody({ type: CreateTimetableDto })
  createEntry(@Body() dto: CreateTimetableDto) {
    return this.service.createEntry(dto);
  }

  @Get()
  @ForgeMessage('Timetable fetched')
  @ApiOperation({ summary: 'Get class timetable' })
  @ApiQuery({ name: 'classId', required: false, type: Number })
  @ApiQuery({ name: 'sectionId', required: false, type: Number })
  @ApiQuery({ name: 'branchId', required: false, type: Number })
  @ApiQuery({ name: 'sessionId', required: false, type: Number })
  getEntries(
    @Query('classId') classId?: string,
    @Query('sectionId') sectionId?: string,
    @Query('branchId') branchId?: string,
    @Query('sessionId') sessionId?: string,
  ) {
    return this.service.getEntries({
      classId: classId ? +classId : undefined,
      sectionId: sectionId ? +sectionId : undefined,
      branchId: branchId ? +branchId : undefined,
      sessionId: sessionId ? +sessionId : undefined,
    });
  }

  @Patch(':id')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN)
  @ForgeMessage('Timetable entry updated')
  @ApiOperation({ summary: 'Update a timetable entry' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: CreateTimetableDto })
  updateEntry(
    @Param('id', ParseIntIdPipe) id: number,
    @Body() dto: CreateTimetableDto,
  ) {
    return this.service.updateEntry(id, dto);
  }

  @Delete(':id')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a timetable entry' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 204 })
  removeEntry(@Param('id', ParseIntIdPipe) id: number) {
    return this.service.removeEntry(id);
  }

  @Post('exam')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN)
  @ForgeMessage('Exam timetable entry created')
  @ApiOperation({ summary: 'Add an exam timetable entry' })
  @ApiBody({ type: CreateExamTimetableDto })
  createExamEntry(@Body() dto: CreateExamTimetableDto) {
    return this.service.createExamEntry(dto);
  }

  @Get('exam')
  @ForgeMessage('Exam timetable fetched')
  @ApiOperation({ summary: 'Get exam timetable' })
  @ApiQuery({ name: 'examId', required: false, type: Number })
  @ApiQuery({ name: 'classId', required: false, type: Number })
  @ApiQuery({ name: 'branchId', required: false, type: Number })
  @ApiQuery({ name: 'sessionId', required: false, type: Number })
  getExamEntries(
    @Query('examId') examId?: string,
    @Query('classId') classId?: string,
    @Query('branchId') branchId?: string,
    @Query('sessionId') sessionId?: string,
  ) {
    return this.service.getExamEntries({
      examId: examId ? +examId : undefined,
      classId: classId ? +classId : undefined,
      branchId: branchId ? +branchId : undefined,
      sessionId: sessionId ? +sessionId : undefined,
    });
  }

  @Delete('exam/:id')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete an exam timetable entry' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 204 })
  removeExamEntry(@Param('id', ParseIntIdPipe) id: number) {
    return this.service.removeExamEntry(id);
  }
}
