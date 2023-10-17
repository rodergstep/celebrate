import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';
import { User } from 'src/user/entities/user.entity';

export class CreateCategoryDto {
  @ApiProperty({ example: 'selera' })
  @IsNotEmpty()
  @IsString({ message: 'Must be a string' })
  @Length(4, 16, { message: 'Not less than 4 and not more than 16' })
  title: string;

  @ApiProperty()
  @IsOptional()
  user?: User;
}
