import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException, BadRequestException } from 'nestjs-api-forge';
import { Product } from './entities/product.entity';
import { InventoryCategory } from './entities/inventory-category.entity';
import { StockIssue } from './entities/stock-issue.entity';

@Injectable()
export class InventoryService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
    @InjectRepository(InventoryCategory)
    private categoryRepo: Repository<InventoryCategory>,
    @InjectRepository(StockIssue) private issueRepo: Repository<StockIssue>,
  ) {}

  // Categories
  createCategory(dto: any) {
    return this.categoryRepo.save(this.categoryRepo.create(dto));
  }

  getCategories(branchId?: number) {
    return this.categoryRepo.find({ where: branchId ? { branchId } : {} });
  }

  async removeCategory(id: number) {
    const c = await this.categoryRepo.findOneBy({ id });
    if (!c) throw new NotFoundException('Category not found');
    return this.categoryRepo.remove(c);
  }

  // Products
  createProduct(dto: any) {
    return this.productRepo.save(this.productRepo.create(dto));
  }

  getProducts(filters: { categoryId?: number; branchId?: number }) {
    const qb = this.productRepo.createQueryBuilder('p').orderBy('p.name');
    if (filters.categoryId)
      qb.andWhere('p.categoryId = :categoryId', {
        categoryId: filters.categoryId,
      });
    if (filters.branchId)
      qb.andWhere('p.branchId = :branchId', { branchId: filters.branchId });
    return qb.getMany();
  }

  async updateProduct(id: number, dto: any) {
    const p = await this.productRepo.findOneBy({ id });
    if (!p) throw new NotFoundException('Product not found');
    return this.productRepo.save({ ...p, ...dto });
  }

  async removeProduct(id: number) {
    const p = await this.productRepo.findOneBy({ id });
    if (!p) throw new NotFoundException('Product not found');
    return this.productRepo.remove(p);
  }

  // Stock Purchase (add stock)
  async addStock(productId: number, quantity: number) {
    const p = await this.productRepo.findOneBy({ id: productId });
    if (!p) throw new NotFoundException('Product not found');
    p.currentStock += quantity;
    return this.productRepo.save(p);
  }

  // Stock Issue
  async issueStock(dto: any, issuedBy: number) {
    const p = await this.productRepo.findOneBy({ id: dto.productId });
    if (!p) throw new NotFoundException('Product not found');
    if (p.currentStock < dto.quantity)
      throw new BadRequestException('Insufficient stock');
    p.currentStock -= dto.quantity;
    await this.productRepo.save(p);
    return this.issueRepo.save(this.issueRepo.create({ ...dto, issuedBy }));
  }

  getIssues(filters: { productId?: number; branchId?: number }) {
    const qb = this.issueRepo
      .createQueryBuilder('s')
      .orderBy('s.issueDate', 'DESC');
    if (filters.productId)
      qb.andWhere('s.productId = :productId', { productId: filters.productId });
    if (filters.branchId)
      qb.andWhere('s.branchId = :branchId', { branchId: filters.branchId });
    return qb.getMany();
  }
}
