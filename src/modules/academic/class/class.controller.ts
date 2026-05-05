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
import { ClassService } from './class.service';
import { CreateClassDto } from './dto/create-class.dto';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/constants/roles.enum';
import { ParseIntIdPipe } from '../../../common/pipes/parse-int-id.pipe';

@ApiTags('Academic – Classes')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('academic/classes')
export class ClassController {
  constructor(private readonly service: ClassService) {}

  @Post()
  @Roles(Role.SUPER_ADMIN, Role.ADMIN)
  @ForgeMessage('Class created')
  @ApiOperation({ summary: 'Create a new class' })
  create(@Body() dto: CreateClassDto) {
    return this.service.create(dto);
  }

  @Get()
  @ForgeMessage('Classes fetched')
  @ApiOperation({ summary: 'List classes, optionally filtered by branch' })
  @ApiQuery({ name: 'branchId', required: false, type: Number })
  findAll(@Query('branchId') branchId?: string) {
    return this.service.findAll(branchId ? +branchId : undefined);
  }

  @Get(':id')
  @ForgeMessage('Class fetched')
  @ApiOperation({ summary: 'Get a class by ID' })
  @ApiParam({ name: 'id', type: Number })
  findOne(@Param('id', ParseIntIdPipe) id: number) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN)
  @ForgeMessage('Class updated')
  @ApiOperation({ summary: 'Update a class' })
  @ApiParam({ name: 'id', type: Number })
  update(@Param('id', ParseIntIdPipe) id: number, @Body() dto: CreateClassDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a class' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 204 })
  remove(@Param('id', ParseIntIdPipe) id: number) {
    return this.service.remove(id);
  }
}
