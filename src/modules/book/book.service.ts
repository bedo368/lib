import { Inject, Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create_book.dto';
import { BookEntity } from 'src/common/entities/book.entity';
import { BOOKREPOProvider } from './repositories/yugbyte_repo/book.provider';
import { BookRepoInterface } from './repositories/yugbyte_repo/book.repo.interface';

@Injectable()
export class BookService {
constructor(
      @Inject(BOOKREPOProvider) private readonly bookRepo: BookRepoInterface,
  
){}

  async  createBook( createBookDto: CreateBookDto) : Promise<BookEntity> { 

    return this.bookRepo.createBook(createBookDto);

   }

   async getAllBook(): Promise<BookEntity[]> {
    return this.bookRepo.getAllBook();
  }

  async getBook(id: string): Promise<BookEntity> {
    return this.bookRepo.getBook(id);
  }
}
