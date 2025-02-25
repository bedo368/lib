import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.enetiy';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserAuthRepo extends Repository<UserEntity> {
  async findUser(id: string) {
    return await this.findOne({ where: {  id } });
  }

  async findUserByUserName(userName: string) {
    return await this.findOne({ where: { userName } });
  }

  async cerateNewUser(user: UserEntity) {
    return await this.save(user);
  }
}
