import { DataSource, Repository } from 'typeorm';
import { User } from '../../../../common/entities/user.enetiy';
import { InternalServerErrorException } from '@nestjs/common';
import { UserRole } from '../../../../common/enums/user.role.enum';

export const createUserAuthRepo = (dataSource: DataSource) => {
  const baseRepository: Repository<User> =
    dataSource.getRepository<User>(User);

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
        const newUser = new User();
        newUser.name = name;
        newUser.userName = userName;
        newUser.password = password;
        newUser.role = UserRole.ADMIN;
        await this.save(newUser);
      } catch (error) {
        console.log(error);
        throw new InternalServerErrorException(
          'error while createing the user ',
        );
      }
    },
    async getUserById(id: string) {
      try {
        return await this.findOneBy({ id });
      } catch (error) {
        throw new InternalServerErrorException('error while getting the user ');
      }
    }
  });
};
