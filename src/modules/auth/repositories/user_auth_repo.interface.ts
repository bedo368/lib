import { UserEntity } from "../entities/user.enetiy";

export interface UserAuthInterface {
  findUser(id: string) : Promise<UserEntity>;
  findUserByUserName(userName: string);
  cerateNewUser({ name, userName, password }) ;
}
