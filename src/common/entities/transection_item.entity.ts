import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BookEntity } from './book.entity';
import { TransactionEntity } from './transaction.entity';
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

  @ManyToOne(() => TransactionEntity, transaction => transaction.items)
  transaction: TransactionEntity;

  @ManyToOne(() => BookEntity, book => book.transactionItems)
  book: BookEntity;
}