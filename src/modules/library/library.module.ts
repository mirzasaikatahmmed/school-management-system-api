import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { BookIssue } from './entities/book-issue.entity';
import { BookCategory } from './entities/book-category.entity';
import { LibraryService } from './library.service';
import { LibraryController } from './library.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Book, BookIssue, BookCategory])],
  controllers: [LibraryController],
  providers: [LibraryService],
  exports: [LibraryService],
})
export class LibraryModule {}
