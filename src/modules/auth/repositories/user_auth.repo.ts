import { DataSource, Repository } from 'typeorm';
import { UserEntity } from '../entities/user.enetiy';
import { InternalServerErrorException } from '@nestjs/common';
import { UserRole } from '../enums/user.role';

export const createUserAuthRepo = (dataSource: DataSource) => {
  const baseRepository: Repository<UserEntity> =
    dataSource.getRepository<UserEntity>(UserEntity);

  return baseRepository.extend({
    async findUser(id: string) {
      try {
        return await this.findOneBy({ id });
      } catch (error) {
        throw new InternalServerErrorException('error while getting the user ');
      }
    },

    async findUserByUserName(userName: string) {
      try {
        return await this.findOneBy({ userName });
      } catch (error) {
        throw new InternalServerErrorException('error while getting the user ');
      }
    },

    async cerateNewUser({ name, userName, password }) {
      try {
        const newUser = new UserEntity();
        newUser.name = name;
        newUser.userName = userName;
        newUser.password = password;
        newUser.role = UserRole.USER;
        await this.save(newUser);
      } catch (error) {
        console.log(error);
        throw new InternalServerErrorException(
          'error while createing the user ',
        );
      }
    },
  });
};
