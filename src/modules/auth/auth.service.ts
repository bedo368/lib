import { CreateUserDto } from './dto/create_user.dto';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '../../common/entities/user.enetiy';
import { genrateEncriptedPassword } from 'src/cores/utls/functions/genrate_encripted_password';
import { SingInDto } from './dto/sign_in.dto';
import * as bcrypt from 'bcrypt';
import { UserAuthModel } from './models/user.auth.model';
import { JwtService } from '@nestjs/jwt';
import { AUTHREPO } from './repositories/yugbyte_repo/auth.provider';
import { UserAuthInterface } from './repositories/yugbyte_repo/user_auth_repo.interface';
@Injectable()
export class AuthService {
  constructor(
    @Inject(AUTHREPO) private readonly userRepo: UserAuthInterface,
    
    private jwtService: JwtService,
  ) {}
  async signUp(createUserDto: CreateUserDto) {
    const encriptedPassword = await genrateEncriptedPassword(
      createUserDto.password,
    );

    await this.userRepo.cerateNewUser({
      name: createUserDto.name,
      userName: createUserDto.userName,
      password: encriptedPassword,
    });
  }

  async signIn(signInDto: SingInDto): Promise<UserAuthModel> {
    const user = await this.userRepo.findUserByUserName(signInDto.userName);
    if (!user) {
      throw new Error('user not found');
    }
    const isPasswordMatch = await bcrypt.compare(
      signInDto.password,
      user.password,
    );
    if (!isPasswordMatch) {
      throw new UnauthorizedException('password is incorrect');
    }

    const token = await this.jwtService.sign({ id: user.id , role: user.role }); 

    return{
      id: user.id,
      name: user.name,
      userName: user.userName,
      token
    }}
   
}
