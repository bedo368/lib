import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateBookDto } from './dto/create_book.dto';
import { BookService } from './book.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/cores/stratigies/roles_guard';
import { Roles } from 'src/common/decorators/role.decorator';
import { UserRole } from 'src/common/enums/user.role.enum';

@Controller('book')
@UseGuards(AuthGuard())
export class BookController {
  constructor(private bookService: BookService) {}
  @Post()
  @UseGuards( RolesGuard) // Apply both JWT and Roles guards
  @Roles(UserRole.ADMIN) // Only allow admin role to access this route
  async createBook(@Body() createBookDto: CreateBookDto) {
    const book = await this.bookService.createBook(createBookDto);

    return {
      message: 'book created successfully',
      error: false,
      data: { book },
    };
  }

  @Get('/:bookId')
  async getBook(@Query('bookId') id: string) {
    if (!isValidUUID(id)) {
      throw new BadRequestException('Invalid book ID format');
    }

    const book = await this.bookService.getBook(id);

    return {
      message: 'Book retrieved successfully',
      error: false,
      data: { book },
    };
  }

  /** Function to check if ID is a valid UUID */

  @Get()
  async getAllBook() {
    const books = await this.bookService.getAllBook();

    return {
      message: 'book created successfully',
      error: false,
      data: { books },
    };
  }
}

function isValidUUID(id: string): boolean {
  return /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(
    id,
  );
}
