import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.enetiy';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from '../dto/create_user.dto';

@Injectable()
export class UserAuthRepo extends Repository<UserEntity> {
  async findUser(id: string) {
    try {
      return await this.findOneBy({ id });
    } catch (error) {
      throw new InternalServerErrorException('error while getting the user ');
    }
  }

  async findUserByUserName(userName: string) {
    try {
      return await this.findOneBy({ userName });
    } catch (error) {
      throw new InternalServerErrorException('error while getting the user ');
    }
  }

  async cerateNewUser({name, userName, password}) {
    try {
      const newUser = new UserEntity();
      newUser.name = name;
      newUser.userName = userName;
      newUser.password = password;
      await this.save(newUser);
    } catch (error) {
      throw new InternalServerErrorException('error while createing the user ');
    }
  }
}
