import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiParam,
  ApiQuery,
  ApiBody,
} from '@nestjs/swagger';
import { ForgeMessage } from 'nestjs-api-forge';
import { LibraryService } from './library.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '../../common/constants/roles.enum';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { ParseIntIdPipe } from '../../common/pipes/parse-int-id.pipe';

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
  @ApiBody({
    schema: {
      properties: {
        title: { type: 'string', example: 'Bangla Grammar' },
        author: { type: 'string', example: 'Dr. Humayun Azad' },
        isbnNo: { type: 'string', example: '978-984-00-0000-0' },
        categoryId: { type: 'number', example: 1 },
        publisher: { type: 'string', example: 'Dhaka: BD Publishers' },
        edition: { type: 'string', example: '3rd' },
        purchaseDate: { type: 'string', example: '2023-01-01' },
        price: { type: 'number', example: 250 },
        totalStock: { type: 'string', example: '10' },
        branchId: { type: 'number', example: 1 },
      },
      required: [
        'title',
        'author',
        'isbnNo',
        'categoryId',
        'publisher',
        'edition',
        'purchaseDate',
        'price',
        'totalStock',
      ],
    },
  })
  createBook(@Body() dto: any) {
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
  updateBook(@Param('id', ParseIntIdPipe) id: number, @Body() dto: any) {
    return this.libraryService.updateBook(id, dto);
  }

  @Post('issues')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN, Role.LIBRARIAN)
  @ForgeMessage('Book issued successfully')
  @ApiOperation({ summary: 'Issue a book to a user' })
  @ApiBody({
    schema: {
      properties: {
        bookId: { type: 'number', example: 1 },
        userId: { type: 'number', example: 1 },
        roleId: { type: 'number', example: 7 },
        dateOfIssue: { type: 'string', example: '2025-05-05' },
        dateOfExpiry: { type: 'string', example: '2025-05-19' },
        sessionId: { type: 'number', example: 6 },
        branchId: { type: 'number', example: 1 },
      },
      required: [
        'bookId',
        'userId',
        'roleId',
        'dateOfIssue',
        'dateOfExpiry',
        'sessionId',
      ],
    },
  })
  issueBook(@Body() dto: any) {
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
}
