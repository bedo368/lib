import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserRole } from '../enums/user.role.enum';
import { Transaction  } from './transaction.entity';
import { Book } from './book.entity';

@Entity()
export class User {
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

  @OneToMany(() => Transaction, transaction => transaction.user)
  transactions: Transaction[];
  @OneToMany(() => Book, book => book.creator)
  books: Book[];
}
