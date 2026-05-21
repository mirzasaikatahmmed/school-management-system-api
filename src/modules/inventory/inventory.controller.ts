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
import { InventoryService } from './inventory.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '../../common/constants/roles.enum';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { ParseIntIdPipe } from '../../common/pipes/parse-int-id.pipe';
import { CreateInventoryCategoryDto } from './dto/create-inventory-category.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { AddStockDto } from './dto/add-stock.dto';
import { IssueStockDto } from './dto/issue-stock.dto';

@ApiTags('Inventory')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('inventory')
export class InventoryController {
  constructor(private readonly service: InventoryService) {}

  @Post('categories')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN)
  @ForgeMessage('Category created')
  @ApiOperation({ summary: 'Create an inventory category' })
  @ApiBody({ type: CreateInventoryCategoryDto })
  createCategory(@Body() dto: CreateInventoryCategoryDto) {
    return this.service.createCategory(dto);
  }

  @Get('categories')
  @ForgeMessage('Categories fetched')
  @ApiOperation({ summary: 'List inventory categories' })
  @ApiQuery({ name: 'branchId', required: false, type: Number })
  getCategories(@Query('branchId') branchId?: string) {
    return this.service.getCategories(branchId ? +branchId : undefined);
  }

  @Delete('categories/:id')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete an inventory category' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 204 })
  removeCategory(@Param('id', ParseIntIdPipe) id: number) {
    return this.service.removeCategory(id);
  }

  @Post('products')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN)
  @ForgeMessage('Product created')
  @ApiOperation({ summary: 'Add an inventory product' })
  @ApiBody({ type: CreateProductDto })
  createProduct(@Body() dto: CreateProductDto) {
    return this.service.createProduct(dto);
  }

  @Get('products')
  @ForgeMessage('Products fetched')
  @ApiOperation({ summary: 'List inventory products' })
  @ApiQuery({ name: 'categoryId', required: false, type: Number })
  @ApiQuery({ name: 'branchId', required: false, type: Number })
  getProducts(
    @Query('categoryId') categoryId?: string,
    @Query('branchId') branchId?: string,
  ) {
    return this.service.getProducts({
      categoryId: categoryId ? +categoryId : undefined,
      branchId: branchId ? +branchId : undefined,
    });
  }

  @Patch('products/:id')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN)
  @ForgeMessage('Product updated')
  @ApiOperation({ summary: 'Update a product' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: CreateProductDto })
  updateProduct(
    @Param('id', ParseIntIdPipe) id: number,
    @Body() dto: CreateProductDto,
  ) {
    return this.service.updateProduct(id, dto);
  }

  @Delete('products/:id')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a product' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 204 })
  removeProduct(@Param('id', ParseIntIdPipe) id: number) {
    return this.service.removeProduct(id);
  }

  @Post('products/:id/add-stock')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN)
  @ForgeMessage('Stock added')
  @ApiOperation({ summary: 'Add stock for a product (purchase)' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: AddStockDto })
  addStock(@Param('id', ParseIntIdPipe) id: number, @Body() body: AddStockDto) {
    return this.service.addStock(id, body.quantity);
  }

  @Post('issues')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN)
  @ForgeMessage('Stock issued')
  @ApiOperation({ summary: 'Issue stock to a department/person' })
  @ApiBody({ type: IssueStockDto })
  issueStock(@Body() dto: IssueStockDto, @CurrentUser() user: any) {
    return this.service.issueStock(dto, user.id);
  }

  @Get('issues')
  @ForgeMessage('Issue records fetched')
  @ApiOperation({ summary: 'List stock issue records' })
  @ApiQuery({ name: 'productId', required: false, type: Number })
  @ApiQuery({ name: 'branchId', required: false, type: Number })
  getIssues(
    @Query('productId') productId?: string,
    @Query('branchId') branchId?: string,
  ) {
    return this.service.getIssues({
      productId: productId ? +productId : undefined,
      branchId: branchId ? +branchId : undefined,
    });
  }
}
