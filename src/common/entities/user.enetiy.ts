import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserRole } from '../enums/user.role.enum';
import { TransactionEntity  } from './transaction.entity';
import { BookEntity } from './book.entity';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  userName: string;

  @Column()
  password: string;

  @Column({ enum: UserRole  ,default: UserRole.ADMIN})
  role: UserRole;

  @OneToMany(() => TransactionEntity, transaction => transaction.user)
  transactions: TransactionEntity[];
  @OneToMany(() => BookEntity, book => book.creator)
  books: BookEntity[];
}
