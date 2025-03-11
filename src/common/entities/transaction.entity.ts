import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TransactionTypeEnum } from "../enums/transection.type.enum";
import { User } from "./user.enetiy";
import { TransactionItem } from "./transection_item.entity";
import { Exclude, Expose } from "class-transformer";

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column()
  total: number;

  @Column()
  transactionDate: Date;

  @ManyToOne(() => User, user => user.transactions ,{nullable: false})
  user: User;

  @OneToMany(() => TransactionItem, item => item.transaction ,  { cascade: true })
  @Exclude()  // Exclude the circular items from serialization
  items: TransactionItem[];

  @Expose()  // Expose any other necessary properties
  transactionId: string;  // Example of exposing other properties
}
