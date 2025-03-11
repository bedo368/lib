import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsNumber,
  ValidateNested,
  IsString,
} from 'class-validator';
import { TransactionTypeEnum } from 'src/common/enums/transection.type.enum';

export class CreateTransactionItemDto {
  @IsString({ message: 'bookId must be a valid UUID' })
  @IsNotEmpty({ message: 'bookId is required' })
  bookId: string;

  @Type(() => Number)
  @IsInt({ message: 'Quantity must be an integer' })
  @IsPositive({ message: 'Quantity must be positive' })
  quantity: number;

  @Type(() => Number)
  @IsOptional()
  @IsInt({ message: 'Rental days must be an integer' })
  @IsPositive({ message: 'Rental days must be positive' })
  rentalDays?: number;

  @Type(() => Number)
  @IsNumber({}, { message: 'Item total must be a number' })
  @IsPositive({ message: 'Item total must be positive' })
  itemTotal: number;

  @Type(() => Number)
  @IsNumber({}, { message: 'Price must be a number' })
  @IsPositive({ message: 'Price must be positive' })
  price: number;

  @IsEnum(TransactionTypeEnum, { 
    message: 'Type must be either SELL or RENT' 
  })
  type: TransactionTypeEnum;
}

export class CreateTransactionDto {
  @Type(() => Number)
  @IsNumber({}, { message: 'Total must be a number' })
  @IsPositive({ message: 'Total must be positive' })
  total: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateTransactionItemDto)
  items: CreateTransactionItemDto[];
}