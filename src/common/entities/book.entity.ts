import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TransactionItem } from "./transection_item.entity";

@Entity()
export class BookEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column({ unique: true })
  ISBN: string;

  // ✅ Force `price` to always be stored and returned as a number
  @Column('decimal', {
    transformer: {
      to: (value: number) => value, // Store as-is
      from: (value: string | number) => Number(value), // Convert to number when retrieving
    },
  })
  price: number;

  // ✅ Force `rentalPricePerDay` to be a number
  @Column('decimal', {
    nullable: true,
    default: 0.5,
    transformer: {
      to: (value: number) => value,
      from: (value: string | number) => Number(value),
    },
  })
  rentalPricePerDay: number;

  @Column('int') // ✅ Ensure integer storage
  availableQuantity: number;

  @OneToMany(() => TransactionItem, transactionItem => transactionItem.book)
  transactionItems: TransactionItem[];
}
