import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AUTHREPO, AuthRepoProvider } from './repositories/yugbyte_repo/auth.provider';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({ secret: 'blablabla' }),
  ],
  controllers: [AuthController],
  providers: [AuthService , AuthRepoProvider ,],
  exports:[AUTHREPO]
})
export class AuthModule {}
