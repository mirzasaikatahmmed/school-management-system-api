import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
} from '@nestjs/swagger';
import { ForgeMessage } from 'nestjs-api-forge';
import { SchoolYearService } from './school-year.service';
import { CreateSchoolYearDto } from './dto/create-school-year.dto';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/constants/roles.enum';
import { CurrentUser } from '../../../common/decorators/current-user.decorator';
import { ParseIntIdPipe } from '../../../common/pipes/parse-int-id.pipe';

@ApiTags('Academic – School Years')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('academic/school-years')
export class SchoolYearController {
  constructor(private readonly service: SchoolYearService) {}

  @Post()
  @Roles(Role.SUPER_ADMIN, Role.ADMIN)
  @ForgeMessage('School year created')
  @ApiOperation({ summary: 'Create an academic year' })
  @ApiResponse({ status: 201, description: 'School year created' })
  create(@Body() dto: CreateSchoolYearDto, @CurrentUser() user: any) {
    return this.service.create(dto, user.id);
  }

  @Get()
  @ForgeMessage('School years fetched')
  @ApiOperation({ summary: 'List all academic years' })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ForgeMessage('School year fetched')
  @ApiOperation({ summary: 'Get academic year by ID' })
  @ApiParam({ name: 'id', type: Number })
  findOne(@Param('id', ParseIntIdPipe) id: number) {
    return this.service.findOne(id);
  }

  @Delete(':id')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete an academic year' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 204 })
  remove(@Param('id', ParseIntIdPipe) id: number) {
    return this.service.remove(id);
  }
}
