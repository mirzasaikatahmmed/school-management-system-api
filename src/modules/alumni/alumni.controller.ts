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
import { AlumniService } from './alumni.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '../../common/constants/roles.enum';
import { ParseIntIdPipe } from '../../common/pipes/parse-int-id.pipe';

@ApiTags('Alumni')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('alumni')
export class AlumniController {
  constructor(private readonly service: AlumniService) {}

  @Post()
  @Roles(Role.SUPER_ADMIN, Role.ADMIN)
  @ForgeMessage('Alumni record created')
  @ApiOperation({ summary: 'Add an alumni record' })
  @ApiBody({
    schema: {
      properties: {
        studentId: { type: 'number' },
        fullName: { type: 'string', example: 'Rakib Hasan' },
        email: { type: 'string' },
        phone: { type: 'string' },
        passingYear: { type: 'number', example: 2024 },
        occupation: { type: 'string' },
        address: { type: 'string' },
        branchId: { type: 'number', example: 1 },
      },
      required: ['fullName'],
    },
  })
  create(@Body() dto: any) {
    return this.service.create(dto);
  }

  @Get()
  @ForgeMessage('Alumni fetched')
  @ApiOperation({ summary: 'List alumni' })
  @ApiQuery({ name: 'passingYear', required: false, type: Number })
  @ApiQuery({ name: 'branchId', required: false, type: Number })
  findAll(
    @Query('passingYear') passingYear?: string,
    @Query('branchId') branchId?: string,
  ) {
    return this.service.findAll({
      passingYear: passingYear ? +passingYear : undefined,
      branchId: branchId ? +branchId : undefined,
    });
  }

  @Get(':id')
  @ForgeMessage('Alumni fetched')
  @ApiOperation({ summary: 'Get alumni by ID' })
  @ApiParam({ name: 'id', type: Number })
  findOne(@Param('id', ParseIntIdPipe) id: number) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN)
  @ForgeMessage('Alumni updated')
  @ApiOperation({ summary: 'Update alumni record' })
  @ApiParam({ name: 'id', type: Number })
  update(@Param('id', ParseIntIdPipe) id: number, @Body() dto: any) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete alumni record' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 204 })
  remove(@Param('id', ParseIntIdPipe) id: number) {
    return this.service.remove(id);
  }
}
