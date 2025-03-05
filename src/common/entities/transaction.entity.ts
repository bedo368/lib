import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TransactionType } from "../enums/transection.type.enum";
import { UserEntity } from "./user.enetiy";
import { TransactionItem } from "./transection_item.entity";

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column({ type: 'enum', enum: TransactionType })
  type: TransactionType;

  @Column()
  total: number;

  @Column()
  transactionDate: Date;

  @ManyToOne(() => UserEntity, user => user.transactions)
  user: UserEntity;

  @OneToMany(() => TransactionItem, item => item.transaction)
  items: TransactionItem[];
}
