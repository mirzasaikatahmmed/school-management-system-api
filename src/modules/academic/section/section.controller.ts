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
} from '@nestjs/swagger';
import { ForgeMessage } from 'nestjs-api-forge';
import { SectionService } from './section.service';
import { CreateSectionDto } from './dto/create-section.dto';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/constants/roles.enum';
import { ParseIntIdPipe } from '../../../common/pipes/parse-int-id.pipe';

@ApiTags('Academic – Sections')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('academic/sections')
export class SectionController {
  constructor(private readonly service: SectionService) {}

  @Post()
  @Roles(Role.SUPER_ADMIN, Role.ADMIN)
  @ForgeMessage('Section created')
  @ApiOperation({ summary: 'Create a new section' })
  create(@Body() dto: CreateSectionDto) {
    return this.service.create(dto);
  }

  @Get()
  @ForgeMessage('Sections fetched')
  @ApiOperation({ summary: 'List sections, optionally filtered by branch' })
  @ApiQuery({ name: 'branchId', required: false, type: Number })
  findAll(@Query('branchId') branchId?: string) {
    return this.service.findAll(branchId ? +branchId : undefined);
  }

  @Get(':id')
  @ForgeMessage('Section fetched')
  @ApiOperation({ summary: 'Get a section by ID' })
  @ApiParam({ name: 'id', type: Number })
  findOne(@Param('id', ParseIntIdPipe) id: number) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN)
  @ForgeMessage('Section updated')
  @ApiOperation({ summary: 'Update a section' })
  @ApiParam({ name: 'id', type: Number })
  update(
    @Param('id', ParseIntIdPipe) id: number,
    @Body() dto: CreateSectionDto,
  ) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a section' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 204 })
  remove(@Param('id', ParseIntIdPipe) id: number) {
    return this.service.remove(id);
  }
}
