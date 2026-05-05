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
import { ParentsService } from './parents.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '../../common/constants/roles.enum';
import { ParseIntIdPipe } from '../../common/pipes/parse-int-id.pipe';

@ApiTags('Parents')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('parents')
export class ParentsController {
  constructor(private readonly service: ParentsService) {}

  @Post()
  @Roles(Role.SUPER_ADMIN, Role.ADMIN)
  @ForgeMessage('Parent created')
  @ApiOperation({ summary: 'Create a parent profile' })
  @ApiBody({
    schema: {
      properties: {
        fullName: { type: 'string', example: 'Rahim Uddin' },
        email: { type: 'string' },
        phone: { type: 'string', example: '01711223344' },
        occupation: { type: 'string' },
        address: { type: 'string' },
        nationalId: { type: 'string' },
        branchId: { type: 'number', example: 1 },
      },
      required: ['fullName'],
    },
  })
  create(@Body() dto: any) {
    return this.service.create(dto);
  }

  @Get()
  @ForgeMessage('Parents fetched')
  @ApiOperation({ summary: 'List all parents' })
  @ApiQuery({ name: 'branchId', required: false, type: Number })
  findAll(@Query('branchId') branchId?: string) {
    return this.service.findAll(branchId ? +branchId : undefined);
  }

  @Get(':id')
  @ForgeMessage('Parent fetched')
  @ApiOperation({ summary: 'Get parent by ID' })
  @ApiParam({ name: 'id', type: Number })
  findOne(@Param('id', ParseIntIdPipe) id: number) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN)
  @ForgeMessage('Parent updated')
  @ApiOperation({ summary: 'Update parent profile' })
  @ApiParam({ name: 'id', type: Number })
  update(@Param('id', ParseIntIdPipe) id: number, @Body() dto: any) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a parent' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 204 })
  remove(@Param('id', ParseIntIdPipe) id: number) {
    return this.service.remove(id);
  }
}
