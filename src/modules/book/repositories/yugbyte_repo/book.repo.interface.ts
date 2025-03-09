import { BookEntity } from "src/common/entities/book.entity";
import { CreateBookDto } from "../../dto/create_book.dto";


export interface BookRepoInterface {

   createBook( createBookDto: CreateBookDto) : Promise<BookEntity> ;
   getBook( id: string) : Promise<BookEntity>;
   getAllBook() : Promise<BookEntity[]>;
}