import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { UserRole } from "../enums/user.role";


export class SingInDto {


  @IsString( { message: 'userName must be not empty string'})
  @IsNotEmpty()
  userName: string;

  @IsString( { message: 'password must be not empty string'})
  @IsNotEmpty()
  password: string;

  @IsEnum(UserRole , { message: 'role must be ADMIN or USER'})
  @IsNotEmpty()
  @IsOptional()
  role: UserRole;
}