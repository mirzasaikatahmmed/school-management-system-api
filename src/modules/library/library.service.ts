import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from 'nestjs-api-forge';
import { Book } from './entities/book.entity';
import { BookIssue } from './entities/book-issue.entity';

@Injectable()
export class LibraryService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepo: Repository<Book>,
    @InjectRepository(BookIssue)
    private readonly issueRepo: Repository<BookIssue>,
  ) {}

  async createBook(dto: Partial<Book>): Promise<Book> {
    return this.bookRepo.save(this.bookRepo.create(dto));
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

  async updateBook(id: number, dto: Partial<Book>): Promise<Book> {
    const book = await this.findBook(id);
    Object.assign(book, dto);
    return this.bookRepo.save(book);
  }

  async issueBook(dto: Partial<BookIssue>): Promise<BookIssue> {
    const book = await this.findBook(dto.bookId!);
    const currentIssued = parseInt(book.issuedCopies) || 0;
    const total = parseInt(book.totalStock) || 0;
    if (currentIssued >= total) {
      throw new Error('No copies available for issue');
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
}
