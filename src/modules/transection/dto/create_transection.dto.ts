import { Type } from 'class-transformer';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { TransactionTypeEnum } from 'src/common/enums/transection.type.enum';

export class CreateTransectionDto {
  @IsString({ message: 'bookId must be a non-empty uuid' })
  @IsNotEmpty({ message: 'bookId must be a non-empty uuid' })
  bookId: string;

  @Type(() => Number) // ✅ Ensures the value is converted into an integer
  @IsInt({ message: 'quantity must be an integer' })
  @IsNotEmpty({ message: 'quantity must be an integer' })
  @IsPositive({ message: 'quantity must be greater than 0' })
  quantity: number;

  @Type(() => Number) // ✅ Ensures the value is converted into an integer
  @IsInt({ message: 'rentalDays must be an integer' })
  @IsOptional({ message: 'rentalDays must be an integer' })
  @IsPositive({ message: 'rentalDays must be greater than 0' })
  rentalDays?: number;

  @IsEnum(TransactionTypeEnum, { message: 'type must be SeLL or RENT' })
  @IsNotEmpty({ message: 'type must be SeLL or RENT' })
  type: TransactionTypeEnum;

  @Type(() => Number) // ✅ Ensures the value is converted into an integer
  @IsInt({ message: 'quantity must be an integer' })
  @IsNotEmpty({ message: 'quantity must be an integer' })
  @IsPositive({ message: 'quantity must be greater than 0' })
  itemTotal: number;
}
