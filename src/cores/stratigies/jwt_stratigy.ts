import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserEntity } from 'src/modules/auth/entities/user.enetiy';
import { UserAuthModel } from 'src/modules/auth/models/user.auth.model';
import { AUTHREPO } from 'src/modules/auth/providers/auth.provider';
import { UserAuthInterface } from 'src/modules/auth/repositories/user_auth_repo.interface';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(AUTHREPO) private readonly userRepo: UserAuthInterface,
  ) {
    super({
      secretOrKey: 'blablabla',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }


  async validate(args): Promise<UserEntity> {
    const { id  , userName } = args;
    const user = await this.userRepo.findUser(id);

    return user;
    
  }
}
