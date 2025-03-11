import { Inject, Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create_book.dto';
import { Book } from 'src/common/entities/book.entity';
import { BOOKREPOProvider } from './repositories/yugbyte_repo/book.provider';
import { BookRepoInterface } from './repositories/yugbyte_repo/book.repo.interface';
import { UpdateBookDto } from './dto/update_book.dto';

@Injectable()
export class BookService {
  constructor(
    @Inject(BOOKREPOProvider) private readonly bookRepo: BookRepoInterface,
  ) {}

  async createBook(
    createBookDto: CreateBookDto,
    userId: String,
  ): Promise<Book> {
    return this.bookRepo.createBook(createBookDto, userId);
  }

  async getAllBook(): Promise<Book[]> {
    return this.bookRepo.getAllBook();
  }

  async getBook(id: string): Promise<Book> {
    return this.bookRepo.getBook(id);
  }

  async deleteBook(id: string): Promise<Book> {
    return this.bookRepo.deleteBook(id);
  }

  async updateBook( id:string,updateBookDto: UpdateBookDto): Promise<Book> {
    return this.bookRepo.updateBook(id, updateBookDto);
  }
}
