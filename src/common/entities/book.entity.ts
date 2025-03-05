import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TransactionItem } from "./transection_item.entity";

@Entity()
export class Book {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column()
  title: string;

  @Column({ unique: true })
  ISBN: string;

  @Column('decimal')
  price: number;

  @Column('decimal')
  rentalPricePerDay: number;

  @Column()
  availableQuantity: number;

  @OneToMany(() => TransactionItem, transactionItem => transactionItem.book)
  transactionItems: TransactionItem[];
}