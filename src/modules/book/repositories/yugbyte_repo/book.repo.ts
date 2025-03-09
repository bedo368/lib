import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { BookEntity } from 'src/common/entities/book.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateBookDto } from '../../dto/create_book.dto';
import { handleDatabaseError } from 'src/cores/utls/functions/database_error';

export const createBookRepo = (dataSource: DataSource) => {
  const baseRepository: Repository<BookEntity> =
    dataSource.getRepository<BookEntity>(BookEntity);

  return baseRepository.extend({
    async createBook(createBookDto: CreateBookDto): Promise<BookEntity> {
      try {
        const book = await this.save({
          title: createBookDto.title,
          price: createBookDto.price,
          availableQuantity: createBookDto.quantity,
          ISBN: createBookDto.isbn,
          rentalPricePerDay: createBookDto.rentalPricePerDay,
        });
        console.log(book);
        return book;
      } catch (error) {
        const newerror = handleDatabaseError(error);
        throw newerror;
      }
    },
    async getBook(id: string): Promise<BookEntity> {
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
    async getAllBook(): Promise<BookEntity[]> {
      try {
        return this.find();
      } catch (error) {
        const newerror = handleDatabaseError(error);
        throw newerror;
      }
    },
  });
};
