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
import { CreateAwardDto } from './dto/create-award.dto';

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
  @ApiBody({ type: CreateAwardDto })
  create(@Body() dto: CreateAwardDto, @CurrentUser() user: any) {
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
  @ApiBody({ type: CreateAwardDto })
  update(@Param('id', ParseIntIdPipe) id: number, @Body() dto: CreateAwardDto) {
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
