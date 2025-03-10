import { BookEntity } from "src/common/entities/book.entity";
import { CreateBookDto } from "../../dto/create_book.dto";
import { UpdateBookDto } from "../../dto/update_book.dto";


export interface BookRepoInterface {

   createBook( createBookDto: CreateBookDto , creator :String)  : Promise<BookEntity> ;
   getBook( id: string) : Promise<BookEntity>;
   getAllBook() : Promise<BookEntity[]>;
   deleteBook( id: string) : Promise<BookEntity>;
   updateBook( id: string , createBookDto: UpdateBookDto) : Promise<BookEntity>;
}