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
import { CertificateService } from './certificate.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '../../common/constants/roles.enum';
import { ParseIntIdPipe } from '../../common/pipes/parse-int-id.pipe';
import { CreateCertificateTemplateDto } from './dto/create-certificate-template.dto';

@ApiTags('Certificates & Cards')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('certificates')
export class CertificateController {
  constructor(private readonly service: CertificateService) {}

  @Post('templates')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN)
  @ForgeMessage('Template created')
  @ApiOperation({ summary: 'Create a certificate/ID card/admit card template' })
  @ApiBody({ type: CreateCertificateTemplateDto })
  createTemplate(@Body() dto: CreateCertificateTemplateDto) {
    return this.service.createTemplate(dto);
  }

  @Get('templates')
  @ForgeMessage('Templates fetched')
  @ApiOperation({ summary: 'List certificate templates' })
  @ApiQuery({
    name: 'type',
    required: false,
    type: String,
    description: 'certificate | id_card | admit_card',
  })
  @ApiQuery({ name: 'branchId', required: false, type: Number })
  getTemplates(
    @Query('type') type?: string,
    @Query('branchId') branchId?: string,
  ) {
    return this.service.getTemplates({
      type,
      branchId: branchId ? +branchId : undefined,
    });
  }

  @Get('templates/:id')
  @ForgeMessage('Template fetched')
  @ApiOperation({ summary: 'Get a template by ID' })
  @ApiParam({ name: 'id', type: Number })
  findTemplate(@Param('id', ParseIntIdPipe) id: number) {
    return this.service.findTemplate(id);
  }

  @Patch('templates/:id')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN)
  @ForgeMessage('Template updated')
  @ApiOperation({ summary: 'Update a certificate template' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: CreateCertificateTemplateDto })
  updateTemplate(@Param('id', ParseIntIdPipe) id: number, @Body() dto: CreateCertificateTemplateDto) {
    return this.service.updateTemplate(id, dto);
  }

  @Delete('templates/:id')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a certificate template' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 204 })
  removeTemplate(@Param('id', ParseIntIdPipe) id: number) {
    return this.service.removeTemplate(id);
  }
}
