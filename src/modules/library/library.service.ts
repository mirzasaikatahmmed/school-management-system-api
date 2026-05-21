import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException, BadRequestException } from 'nestjs-api-forge';
import { Book } from './entities/book.entity';
import { BookIssue } from './entities/book-issue.entity';
import { BookCategory } from './entities/book-category.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { IssueBookDto } from './dto/issue-book.dto';
import { CreateBookCategoryDto } from './dto/create-book-category.dto';

@Injectable()
export class LibraryService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepo: Repository<Book>,
    @InjectRepository(BookIssue)
    private readonly issueRepo: Repository<BookIssue>,
    @InjectRepository(BookCategory)
    private readonly categoryRepo: Repository<BookCategory>,
  ) {}

  async createBook(dto: CreateBookDto): Promise<Book> {
    const data = this.bookRepo.create({ ...dto, totalStock: String(dto.totalStock) } as any);
    return this.bookRepo.save(data as unknown as Book);
  }

  async findAllBooks(branchId?: number, search?: string): Promise<Book[]> {
    const qb = this.bookRepo.createQueryBuilder('b');
    if (branchId) qb.andWhere('b.branchId = :branchId', { branchId });
    if (search) {
      qb.andWhere(
        '(b.title ILIKE :q OR b.author ILIKE :q OR b.isbnNo ILIKE :q)',
        { q: `%${search}%` },
      );
    }
    return qb.orderBy('b.title', 'ASC').getMany();
  }

  async findBook(id: number): Promise<Book> {
    const book = await this.bookRepo.findOne({ where: { id } });
    if (!book) throw new NotFoundException('Book not found');
    return book;
  }

  async updateBook(id: number, dto: Partial<CreateBookDto>): Promise<Book> {
    const book = await this.findBook(id);
    Object.assign(book, dto);
    return this.bookRepo.save(book);
  }

  async issueBook(dto: IssueBookDto): Promise<BookIssue> {
    const book = await this.findBook(dto.bookId);
    const currentIssued = parseInt(book.issuedCopies) || 0;
    const total = parseInt(book.totalStock) || 0;
    if (currentIssued >= total) {
      throw new BadRequestException('No copies available for issue');
    }
    await this.bookRepo.update(book.id, {
      issuedCopies: String(currentIssued + 1),
    });
    return this.issueRepo.save(this.issueRepo.create(dto));
  }

  async returnBook(issueId: number, returnBy: number): Promise<BookIssue> {
    const issue = await this.issueRepo.findOne({ where: { id: issueId } });
    if (!issue) throw new NotFoundException('Issue record not found');
    const today = new Date().toISOString().split('T')[0];
    issue.returnDate = today;
    issue.status = 3;
    issue.returnBy = returnBy;
    const book = await this.findBook(issue.bookId);
    const currentIssued = parseInt(book.issuedCopies) || 0;
    await this.bookRepo.update(book.id, {
      issuedCopies: String(Math.max(0, currentIssued - 1)),
    });
    return this.issueRepo.save(issue);
  }

  async getIssues(filter: {
    userId?: number;
    bookId?: number;
    status?: number;
    branchId?: number;
  }): Promise<BookIssue[]> {
    const where: any = {};
    Object.entries(filter).forEach(([k, v]) => {
      if (v !== undefined) where[k] = v;
    });
    return this.issueRepo.find({ where, order: { createdAt: 'DESC' } });
  }

  async getOverdueIssues(dailyFineRate: number, branchId?: number): Promise<(BookIssue & { daysOverdue: number; fine: number })[]> {
    const today = new Date().toISOString().split('T')[0];
    const qb = this.issueRepo
      .createQueryBuilder('i')
      .where('i.status = :status', { status: 1 })
      .andWhere('i.dateOfExpiry < :today', { today });
    if (branchId) qb.andWhere('i.branchId = :branchId', { branchId });
    const issues = await qb.getMany();
    return issues.map((issue) => {
      const expiry = new Date(issue.dateOfExpiry);
      const daysOverdue = Math.floor((Date.now() - expiry.getTime()) / 86_400_000);
      return { ...issue, daysOverdue, fine: daysOverdue * dailyFineRate };
    });
  }

  // Book Categories
  createCategory(dto: CreateBookCategoryDto): Promise<BookCategory> {
    return this.categoryRepo.save(this.categoryRepo.create(dto));
  }

  getCategories(branchId?: number): Promise<BookCategory[]> {
    return this.categoryRepo.find({
      where: branchId ? { branchId } : {},
      order: { name: 'ASC' },
    });
  }

  async updateCategory(id: number, dto: Partial<CreateBookCategoryDto>): Promise<BookCategory> {
    const cat = await this.categoryRepo.findOneBy({ id });
    if (!cat) throw new NotFoundException('Category not found');
    return this.categoryRepo.save({ ...cat, ...dto });
  }

  async removeCategory(id: number): Promise<void> {
    const cat = await this.categoryRepo.findOneBy({ id });
    if (!cat) throw new NotFoundException('Category not found');
    await this.categoryRepo.remove(cat);
  }
}
