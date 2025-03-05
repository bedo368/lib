import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './common/entities/user.enetiy';
import { JwtStrategy } from './cores/stratigies/jwt_stratigy';
import { TransactionItem } from './common/entities/transection_item.entity';
import { Book } from './common/entities/book.entity';
import { Transaction } from './common/entities/transaction.entity';
import { BookModule } from './modules/book/book.module';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'postgres', // <-- Use 'postgres' since YugabyteDB is wire-compatible
      host: process.env.DB_HOST || '127.0.0.1',
      port: Number(process.env.DB_PORT) || 5433,
      username: process.env.DB_USER || 'yugabyte',
      password: process.env.DB_PASS || 'yugabyte',
      database: process.env.DB_NAME || 'yugabyte',
      synchronize: true, // For development only. Don't use 'true' in production.,
      entities: [ UserEntity , Transaction , TransactionItem , Book],
    }),
    BookModule,
  ],
  controllers: [],
  providers: [JwtStrategy],
  exports : [JwtStrategy]
})
export class AppModule {}
