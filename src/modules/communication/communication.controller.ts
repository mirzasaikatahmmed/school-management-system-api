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
import { CommunicationService } from './communication.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '../../common/constants/roles.enum';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { ParseIntIdPipe } from '../../common/pipes/parse-int-id.pipe';
import { CreateEventDto } from './dto/create-event.dto';
import { SendMessageDto } from './dto/send-message.dto';

@ApiTags('Communication')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('communication')
export class CommunicationController {
  constructor(private readonly service: CommunicationService) {}

  @Post('events')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN)
  @ForgeMessage('Event created')
  @ApiOperation({ summary: 'Create a school event' })
  @ApiBody({ type: CreateEventDto })
  createEvent(@Body() dto: CreateEventDto) {
    return this.service.createEvent(dto);
  }

  @Get('events')
  @ForgeMessage('Events fetched')
  @ApiOperation({ summary: 'List school events' })
  @ApiQuery({ name: 'branchId', required: false, type: Number })
  @ApiQuery({ name: 'sessionId', required: false, type: Number })
  getEvents(
    @Query('branchId') branchId?: string,
    @Query('sessionId') sessionId?: string,
  ) {
    return this.service.getEvents(
      branchId ? +branchId : undefined,
      sessionId ? +sessionId : undefined,
    );
  }

  @Get('events/:id')
  @ForgeMessage('Event fetched')
  @ApiOperation({ summary: 'Get event by ID' })
  @ApiParam({ name: 'id', type: Number })
  findEvent(@Param('id', ParseIntIdPipe) id: number) {
    return this.service.findEvent(id);
  }

  @Patch('events/:id')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN)
  @ForgeMessage('Event updated')
  @ApiOperation({ summary: 'Update an event' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: CreateEventDto })
  updateEvent(@Param('id', ParseIntIdPipe) id: number, @Body() dto: CreateEventDto) {
    return this.service.updateEvent(id, dto);
  }

  @Delete('events/:id')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete an event' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 204 })
  removeEvent(@Param('id', ParseIntIdPipe) id: number) {
    return this.service.removeEvent(id);
  }

  @Post('messages')
  @ForgeMessage('Message sent')
  @ApiOperation({ summary: 'Send an internal message' })
  @ApiBody({ type: SendMessageDto })
  sendMessage(@Body() dto: SendMessageDto, @CurrentUser() user: any) {
    return this.service.sendMessage({ ...dto, senderId: user.id });
  }

  @Get('messages/inbox')
  @ForgeMessage('Inbox fetched')
  @ApiOperation({ summary: "Get current user's inbox" })
  getInbox(@CurrentUser() user: any) {
    return this.service.getInbox(user.id);
  }

  @Get('messages/sent')
  @ForgeMessage('Sent messages fetched')
  @ApiOperation({ summary: "Get current user's sent messages" })
  getSent(@CurrentUser() user: any) {
    return this.service.getSent(user.id);
  }

  @Patch('messages/:id/read')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Mark a message as read' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 204 })
  markAsRead(@Param('id', ParseIntIdPipe) id: number) {
    return this.service.markAsRead(id);
  }
}
