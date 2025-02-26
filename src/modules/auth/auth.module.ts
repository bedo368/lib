import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserAuthRepo } from './repositories/user_auth.repo';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({ secret: 'blablabla' }),
  ],
  controllers: [AuthController],
  providers: [AuthService , UserAuthRepo]
})
export class AuthModule {}
