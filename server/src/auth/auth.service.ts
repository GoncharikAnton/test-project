import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { CreateUserDtos } from '../users/dtos/create-user.dtos';
import { hash, compare } from 'bcryptjs';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    private readonly config: ConfigService,
  ) {}

  async signin(user: CreateUserDtos) {
    // handle there signin logic
    const dbUser = await this.usersService.getUserByEmail(user.email);
    if ((await compare(user.password, dbUser.password)) == true) {
      const token = await this.generateJWTToken(user, '60');
      return { access_token: token };
    } else {
      throw new UnauthorizedException('Wrong email or password');
    }
  }
  async signup(user: CreateUserDtos) {
    const salt = parseInt(this.config.get<string>('PSWD_SALT_LENGTH'));
    const pswd = await hash(user.password, salt);
    const newUser: CreateUserDtos = { email: user.email, password: pswd };
    const dbUser = await this.usersService.createUser(newUser);
    const token = await this.generateJWTToken(dbUser, '60');
    return { user: dbUser, token };
  }

  getAllUsers() {
    const users = this.usersService.getAllUsers();
    return users;
  }

  async generateJWTToken(user: CreateUserDtos, expiresIn: string) {
    const payload = { sub: user.email, email: user.email };
    return await this.jwtService.signAsync(payload, { expiresIn });
  }

  /**
   * @deprecated
   */
  async validateToken(token: string) {
    try {
      return this.jwtService.verify(token);
    } catch (error) {
      throw new Error('Invalid token');
    }
  }
}
