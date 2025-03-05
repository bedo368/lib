import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Book } from './book.entity';
import { Transaction } from './transaction.entity';
@Entity ()
export class TransactionItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @Column({ nullable: true })
  rentalDays?: number;

  @Column('decimal')
  itemTotal: number;

  @ManyToOne(() => Transaction, transaction => transaction.items)
  transaction: Transaction;

  @ManyToOne(() => Book, book => book.transactionItems)
  book: Book;
}