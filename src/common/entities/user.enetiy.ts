import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserRole } from '../enums/user.role.enum';
import { Transaction } from './transaction.entity';

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

  @OneToMany(() => Transaction, transaction => transaction.user)
  transactions: Transaction[];
}
