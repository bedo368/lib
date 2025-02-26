import { Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create_user.dto';
import { error } from 'console';
import { SingInDto } from './dto/sign_in.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @HttpCode(201)
  async signUp(createUserDto: CreateUserDto) {
    const result = await this.authService.signUp(createUserDto);

    return {
      message: 'user created successfully',
      error: false,
    };
  }


  @Post('signin')
  @HttpCode(200)
  async signIn(signInDto: SingInDto){
    const userData =  await this.authService.signIn(signInDto);

    return {
      message: 'user logged in successfully',
      error: false,
      data: {
        id: userData.id,
        name: userData.name,
        userName: userData.userName,
        role: userData.role,
        token: userData.token
      }
    }
  }
}
