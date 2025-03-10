import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
} from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateBookDto {
  @IsString({ message: 'title must be a non-empty string' })
  @IsOptional({ message: 'title must be a non-empty string' })
  title: string;

  @Type(() => Number) // ✅ Ensures the value is converted into a number
  @IsNumber({}, { message: 'price must be a valid number' })
  @IsOptional({ message: 'price must be provided' })
  @IsPositive({ message: 'price must be greater than 0' })
  price: number;

  @Type(() => Number) // ✅ Ensures the value is converted into an integer
  @IsInt({ message: 'quantity must be an integer' })
  @IsOptional({ message: 'quantity must be provided' })
  @IsPositive({ message: 'quantity must be greater than 0' })
  quantity: number;

  @IsString({ message: 'ISBN must be a non-empty string' })
  @IsOptional({ message: 'ISBN must be provided' })
  isbn: string;

  @Type(() => Number) // ✅ Ensures the value is converted into an integer
  @IsNumber({}, { message: 'rentalPricePerDay must be a valid number' })
  @IsNotEmpty({ message: 'rentalPricePerDay must be provided' })
  @IsPositive({ message: 'rentalPricePerDay must be greater than 0' })
  @IsOptional()
  rentalPricePerDay: number;
}
