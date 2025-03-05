import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create_user.dto';
import { SingInDto } from './dto/sign_in.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @HttpCode(201)
  async signUp(@Body() createUserDto: CreateUserDto) {
    const result = await this.authService.signUp(createUserDto);

    return {
      message: 'user created successfully',
      error: false,
    };
  }


  @Post('signin')
  @HttpCode(200)
  async signIn( @Body() signInDto: SingInDto){
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

  @Post('signout')
  @UseGuards(AuthGuard())
  @HttpCode(200)
  async signOut(){
    return {
      message: 'user logged out successfully',
      error: false,
    }
  }
}
