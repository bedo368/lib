import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { UserRole } from "../../../common/enums/user.role.enum";


export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  userName: string;

  @IsString()
  @IsNotEmpty()
  password: string;

 
}