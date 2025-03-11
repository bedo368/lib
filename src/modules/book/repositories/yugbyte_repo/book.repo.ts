import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Book } from 'src/common/entities/book.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateBookDto } from '../../dto/create_book.dto';
import { handleDatabaseError } from 'src/cores/utls/functions/database_error';

export const createBookRepo = (dataSource: DataSource) => {
  const baseRepository: Repository<Book> =
    dataSource.getRepository<Book>(Book);

  return baseRepository.extend({
    async createBook(
      createBookDto: CreateBookDto,
      creator: String,
    ): Promise<Book> {
      try {
        const book = await this.save({
          title: createBookDto.title,
          price: createBookDto.price,
          availableQuantity: createBookDto.quantity,
          ISBN: createBookDto.isbn,
          rentalPricePerDay: createBookDto.rentalPricePerDay,
          creator: creator,
        });
        console.log(book);
        return book;
      } catch (error) {
        const newerror = handleDatabaseError(error);
        throw newerror;
      }
    },
    async getBook(id: string): Promise<Book> {
      try {
        const book = await this.findOne({ where: { id: id } });

        if (book === null) {
          throw new NotFoundException('book not found');
        }
        return book;
      } catch (error) {
        const newerror = handleDatabaseError(error);
        throw newerror;
      }
    },
    async getAllBook(): Promise<Book[]> {
      try {
        const books = await this.createQueryBuilder('book')
          .leftJoinAndSelect('book.creator', 'creator')
          .select(['book', 'creator.id']) // 👈 Only select the creator's ID
          .getMany();

        console.log(books);
        return books;
      } catch (error) {
        const newerror = handleDatabaseError(error);
        throw newerror;
      }
    },
    async deleteBook(id: string): Promise<Book> {
      try {
        const book = await this.findOne({ where: { id: id } });
        if (book === null) {
          throw new NotFoundException('book not found');
        }
        await this.remove(book);
        return book;
      } catch (error) {
        const newerror = handleDatabaseError(error);
        throw newerror;
      }
    },
    async updateBook(
      id: string,
      createBookDto: CreateBookDto,
    ): Promise<Book> {
      try {
        const book = await this.findOne({ where: { id: id } });
        if (book === null) {
          throw new NotFoundException('book not found');
        }
        if(createBookDto.title){
          book.title = createBookDto.title;
        }
        if(createBookDto.price){
          book.price = createBookDto.price;
        }
        if(createBookDto.quantity){
          book.availableQuantity = createBookDto.quantity;
        }
        if(createBookDto.isbn){
          book.ISBN = createBookDto.isbn;
        }
        if(createBookDto.rentalPricePerDay){
          book.rentalPricePerDay = createBookDto.rentalPricePerDay;
        }
        
        await this.save(book);
        return book;
      } catch (error) {
        const newerror = handleDatabaseError(error);
        throw newerror;
      }
    },
  });
};
