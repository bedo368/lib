import { Module } from '@nestjs/common';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { BookProvider, BOOKREPOProvider } from './repositories/yugbyte_repo/book.provider';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AUTHREPO, AuthRepoProvider } from '../auth/repositories/yugbyte_repo/auth.provider';
import { AuthModule } from '../auth/auth.module';
import { RolesGuard } from 'src/cores/stratigies/roles_guard';

@Module({
   imports: [
      PassportModule.register({ defaultStrategy: 'jwt' }),
      JwtModule.register({ secret: 'blablabla' }),
      AuthModule
      

    ],
  controllers: [BookController],
  providers: [BookService , BookProvider , RolesGuard  ],
  exports : [BOOKREPOProvider ] 
})
export class BookModule {}
