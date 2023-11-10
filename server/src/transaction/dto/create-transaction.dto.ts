import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { User } from 'src/user/entities/user.entity';

export class CreateTransactionDto {
  @ApiProperty({ example: 'selera' })
  @IsNotEmpty()
  @IsString({ message: 'Must be a string' })
  title: string;

  @ApiProperty({ example: 999 })
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  user: User;
}
