import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TransactionTypeEnum } from "../enums/transection.type.enum";
import { UserEntity } from "./user.enetiy";
import { TransactionItem } from "./transection_item.entity";

@Entity()
export class TransactionEntity {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column({ type: 'enum', enum: TransactionTypeEnum })
  type: TransactionTypeEnum;

  @Column()
  total: number;

  @Column()
  transactionDate: Date;

  @ManyToOne(() => UserEntity, user => user.transactions ,{nullable: false})
  user: UserEntity;

  @OneToMany(() => TransactionItem, item => item.transaction)
  items: TransactionItem[];
}
