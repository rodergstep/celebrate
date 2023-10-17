import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginAuthDto } from './dto/login-auth.dto';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginAuthDto: LoginAuthDto) {
    const user = await this.validateUser(loginAuthDto);
    return this.generateToken(user);
  }

  // async registration(userDto: CreateUserDto) {
  //     const candidate = await this.userService.getUserByEmail(userDto.email);
  //     if (candidate) {
  //         throw new HttpException('Пользователь с таким email существует', HttpStatus.BAD_REQUEST);
  //     }
  //     const hashPassword = await bcrypt.hash(userDto.password, 5);
  //     const user = await this.userService.createUser({...userDto, password: hashPassword})
  //     return this.generateToken(user)
  // }

  async validateUser(loginAuthDto: LoginAuthDto) {
    const user = await this.userService.findOne(loginAuthDto.email);
    const isPassMatch = await bcrypt.compare(
      loginAuthDto.password,
      user.password,
    );
    if (user && isPassMatch) {
      return user;
    }
    throw new BadRequestException({
      message: 'User or password are incorrect',
    });
  }

  private async generateToken(user: User) {
    const { id, email } = user;
    return {
      id,
      email,
      token: this.jwtService.sign({ id, email }),
    };
  }
}
