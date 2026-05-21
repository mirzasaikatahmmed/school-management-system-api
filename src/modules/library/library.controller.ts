import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  HttpCode,
  HttpStatus,
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
import { LibraryService } from './library.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '../../common/constants/roles.enum';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { ParseIntIdPipe } from '../../common/pipes/parse-int-id.pipe';
import { CreateBookDto } from './dto/create-book.dto';
import { IssueBookDto } from './dto/issue-book.dto';
import { CreateBookCategoryDto } from './dto/create-book-category.dto';

@ApiTags('Library')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('library')
export class LibraryController {
  constructor(private readonly libraryService: LibraryService) {}

  @Post('books')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN, Role.LIBRARIAN)
  @ForgeMessage('Book added to library')
  @ApiOperation({ summary: 'Add a new book' })
  @ApiBody({ type: CreateBookDto })
  createBook(@Body() dto: CreateBookDto) {
    return this.libraryService.createBook(dto);
  }

  @Get('books')
  @ForgeMessage('Books fetched')
  @ApiOperation({ summary: 'List all books' })
  @ApiQuery({ name: 'branchId', required: false, type: Number })
  @ApiQuery({
    name: 'search',
    required: false,
    type: String,
    description: 'Search by title, author, or ISBN',
  })
  findAllBooks(
    @Query('branchId') branchId?: string,
    @Query('search') search?: string,
  ) {
    return this.libraryService.findAllBooks(
      branchId ? +branchId : undefined,
      search,
    );
  }

  @Get('books/:id')
  @ForgeMessage('Book fetched')
  @ApiOperation({ summary: 'Get book by ID' })
  @ApiParam({ name: 'id', type: Number })
  findBook(@Param('id', ParseIntIdPipe) id: number) {
    return this.libraryService.findBook(id);
  }

  @Patch('books/:id')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN, Role.LIBRARIAN)
  @ForgeMessage('Book updated')
  @ApiOperation({ summary: 'Update book details' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: CreateBookDto })
  updateBook(
    @Param('id', ParseIntIdPipe) id: number,
    @Body() dto: CreateBookDto,
  ) {
    return this.libraryService.updateBook(id, dto);
  }

  @Post('issues')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN, Role.LIBRARIAN)
  @ForgeMessage('Book issued successfully')
  @ApiOperation({ summary: 'Issue a book to a user' })
  @ApiBody({ type: IssueBookDto })
  issueBook(@Body() dto: IssueBookDto) {
    return this.libraryService.issueBook(dto);
  }

  @Patch('issues/:id/return')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN, Role.LIBRARIAN)
  @ForgeMessage('Book returned successfully')
  @ApiOperation({ summary: 'Mark a book as returned' })
  @ApiParam({ name: 'id', type: Number, description: 'Issue record ID' })
  returnBook(
    @Param('id', ParseIntIdPipe) id: number,
    @CurrentUser() user: any,
  ) {
    return this.libraryService.returnBook(id, user.id);
  }

  @Get('issues')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN, Role.LIBRARIAN)
  @ForgeMessage('Issue records fetched')
  @ApiOperation({ summary: 'List book issue records' })
  @ApiQuery({ name: 'userId', required: false, type: Number })
  @ApiQuery({ name: 'bookId', required: false, type: Number })
  @ApiQuery({
    name: 'status',
    required: false,
    type: Number,
    description: '0=pending 1=accepted 2=rejected 3=returned',
  })
  @ApiQuery({ name: 'branchId', required: false, type: Number })
  getIssues(
    @Query('userId') userId?: string,
    @Query('bookId') bookId?: string,
    @Query('status') status?: string,
    @Query('branchId') branchId?: string,
  ) {
    return this.libraryService.getIssues({
      userId: userId ? +userId : undefined,
      bookId: bookId ? +bookId : undefined,
      status: status !== undefined ? +status : undefined,
      branchId: branchId ? +branchId : undefined,
    });
  }

  @Get('overdue')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN, Role.LIBRARIAN)
  @ForgeMessage('Overdue issues fetched')
  @ApiOperation({ summary: 'List overdue book issues with calculated fine' })
  @ApiQuery({ name: 'dailyFineRate', required: false, type: Number, description: 'Fine per day (default 2)' })
  @ApiQuery({ name: 'branchId', required: false, type: Number })
  getOverdueIssues(
    @Query('dailyFineRate') dailyFineRate?: string,
    @Query('branchId') branchId?: string,
  ) {
    return this.libraryService.getOverdueIssues(
      dailyFineRate ? +dailyFineRate : 2,
      branchId ? +branchId : undefined,
    );
  }

  // Book Categories
  @Post('categories')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN, Role.LIBRARIAN)
  @ForgeMessage('Category created')
  @ApiOperation({ summary: 'Create a book category' })
  @ApiBody({ type: CreateBookCategoryDto })
  createCategory(@Body() dto: CreateBookCategoryDto) {
    return this.libraryService.createCategory(dto);
  }

  @Get('categories')
  @ForgeMessage('Categories fetched')
  @ApiOperation({ summary: 'List book categories' })
  @ApiQuery({ name: 'branchId', required: false, type: Number })
  getCategories(@Query('branchId') branchId?: string) {
    return this.libraryService.getCategories(branchId ? +branchId : undefined);
  }

  @Patch('categories/:id')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN, Role.LIBRARIAN)
  @ForgeMessage('Category updated')
  @ApiOperation({ summary: 'Update a book category' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: CreateBookCategoryDto })
  updateCategory(@Param('id', ParseIntIdPipe) id: number, @Body() dto: CreateBookCategoryDto) {
    return this.libraryService.updateCategory(id, dto);
  }

  @Delete('categories/:id')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN, Role.LIBRARIAN)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a book category' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 204 })
  removeCategory(@Param('id', ParseIntIdPipe) id: number) {
    return this.libraryService.removeCategory(id);
  }
}
