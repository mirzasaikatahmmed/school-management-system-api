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
import { AwardService } from './award.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '../../common/constants/roles.enum';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { ParseIntIdPipe } from '../../common/pipes/parse-int-id.pipe';

@ApiTags('Awards')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('awards')
export class AwardController {
  constructor(private readonly service: AwardService) {}

  @Post()
  @Roles(Role.SUPER_ADMIN, Role.ADMIN)
  @ForgeMessage('Award created')
  @ApiOperation({ summary: 'Create an award for student or staff' })
  @ApiBody({
    schema: {
      properties: {
        title: { type: 'string', example: 'Best Student 2025' },
        recipientType: { type: 'string', enum: ['student', 'staff'] },
        recipientId: { type: 'number', example: 5 },
        description: { type: 'string' },
        awardDate: { type: 'string', example: '2025-12-15' },
        branchId: { type: 'number', example: 1 },
        sessionId: { type: 'number', example: 6 },
      },
      required: ['title', 'recipientType', 'recipientId', 'awardDate'],
    },
  })
  create(@Body() dto: any, @CurrentUser() user: any) {
    return this.service.create(dto, user.id);
  }

  @Get()
  @ForgeMessage('Awards fetched')
  @ApiOperation({ summary: 'List awards' })
  @ApiQuery({ name: 'recipientType', required: false, type: String })
  @ApiQuery({ name: 'recipientId', required: false, type: Number })
  @ApiQuery({ name: 'branchId', required: false, type: Number })
  @ApiQuery({ name: 'sessionId', required: false, type: Number })
  getAll(
    @Query('recipientType') recipientType?: string,
    @Query('recipientId') recipientId?: string,
    @Query('branchId') branchId?: string,
    @Query('sessionId') sessionId?: string,
  ) {
    return this.service.getAll({
      recipientType,
      recipientId: recipientId ? +recipientId : undefined,
      branchId: branchId ? +branchId : undefined,
      sessionId: sessionId ? +sessionId : undefined,
    });
  }

  @Patch(':id')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN)
  @ForgeMessage('Award updated')
  @ApiOperation({ summary: 'Update an award' })
  @ApiParam({ name: 'id', type: Number })
  update(@Param('id', ParseIntIdPipe) id: number, @Body() dto: any) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete an award' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 204 })
  remove(@Param('id', ParseIntIdPipe) id: number) {
    return this.service.remove(id);
  }
}
