import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Book } from './book.entity';
import { Transaction } from './transaction.entity';
import { TransactionTypeEnum } from '../enums/transection.type.enum';
import { Exclude, Expose, Type } from 'class-transformer';

@Entity()
export class TransactionItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: TransactionTypeEnum })
  type: TransactionTypeEnum;

  @Column()
  quantity: number;

  @Column({ nullable: true })
  rentalDays?: number;

  @Column({ nullable: true })
  price: number;

  @Column('decimal')
  itemTotal: number;

  @ManyToOne(() => Transaction, (transaction) => transaction.items)
  @Exclude() // Exclude the circular reference from TransactionEntity
  transaction: Transaction;

  @ManyToOne(() => Book, (book) => book.transactionItems)
  @Expose()  // Expose book to be included in serialization
  @Type(() => Book) // Ensure correct type is used during serialization
  book: Book;
}
