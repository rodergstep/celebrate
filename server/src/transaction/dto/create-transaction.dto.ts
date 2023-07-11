import { IsNotEmpty } from 'class-validator';
import { User } from 'src/user/entities/user.entity';

export class CreateTransactionDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  amount: number;

  user: User;
}
