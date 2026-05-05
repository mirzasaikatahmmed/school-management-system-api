import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { InventoryCategory } from './entities/inventory-category.entity';
import { StockIssue } from './entities/stock-issue.entity';
import { InventoryService } from './inventory.service';
import { InventoryController } from './inventory.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Product, InventoryCategory, StockIssue])],
  controllers: [InventoryController],
  providers: [InventoryService],
})
export class InventoryModule {}
