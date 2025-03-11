import { Book } from "src/common/entities/book.entity";
import { CreateBookDto } from "../../dto/create_book.dto";
import { UpdateBookDto } from "../../dto/update_book.dto";


export interface BookRepoInterface {

   createBook( createBookDto: CreateBookDto , creator :String)  : Promise<Book> ;
   getBook( id: string) : Promise<Book>;
   getAllBook() : Promise<Book[]>;
   deleteBook( id: string) : Promise<Book>;
   updateBook( id: string , createBookDto: UpdateBookDto) : Promise<Book>;
}