import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CreateBookDto } from './dto/create_book.dto';
import { BookService } from './book.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/cores/stratigies/roles_guard';
import { Roles } from 'src/common/decorators/role.decorator';
import { UserRole } from 'src/common/enums/user.role.enum';
import { UpdateBookDto } from './dto/update_book.dto';

@Controller('book')
@UseGuards(AuthGuard())
export class BookController {
  constructor(private bookService: BookService) {}
  @Post()
  @UseGuards(  AuthGuard(),RolesGuard) // Apply both JWT and Roles guards
  @Roles(UserRole.ADMIN)
  async createBook(@Body() createBookDto: CreateBookDto  ,  @Request() req, ) {
    const  user = req.user ; 
    console.log(user.id+"vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv")
    const book = await this.bookService.createBook(createBookDto ,  user.id);

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

  @Delete('/:bookId')
  async deleteBook(@Param('bookId') id: string) {
    if (!isValidUUID(id)) {
      throw new BadRequestException('Invalid book ID format');
    }

    await this.bookService.deleteBook(id);

    return {
      message: 'Book deleted successfully',
      error: false,
    };
  }

  @Put('/:bookId')
  async updateBook(@Param('bookId') id: string, @Body() updateBookDto: UpdateBookDto) {
    if (!isValidUUID(id)) {
      throw new BadRequestException('Invalid book ID format');
    }

    const book = await this.bookService.updateBook( id,updateBookDto);

    return {
      message: 'Book updated successfully',
      error: false,
      data: { book },
    };
  }
}

function isValidUUID(id: string): boolean {
  return /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(
    id,
  );
}
