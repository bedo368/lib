import { Module } from '@nestjs/common';
import { TransectionController } from './transection.controller';
import { TransectionService } from './transection.service';
import { transectionProvider, TransectionProvierString } from './repositories/yugbyte_repo/transection.provider';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
     PassportModule.register({ defaultStrategy: 'jwt' }),
          JwtModule.register({ secret: 'blablabla' }),
          AuthModule
  ],
  controllers: [TransectionController],
  providers: [TransectionService , transectionProvider , TransectionService],
  
  exports:[TransectionProvierString]
})
export class TransectionModule {


}
