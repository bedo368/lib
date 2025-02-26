import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { UserRole } from "../enums/user.role";


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