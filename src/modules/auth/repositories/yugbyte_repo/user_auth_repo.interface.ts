import { User } from "../../../../common/entities/user.enetiy";

export interface UserAuthInterface {
  findUser(id: string) : Promise<User>;
  findUserByUserName(userName: string);
  cerateNewUser({ name, userName, password }) ;
  getUserById(id: string) : Promise<User>;
}
