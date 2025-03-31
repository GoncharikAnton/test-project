import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { CreateUserDtos } from '../users/dtos/create-user.dtos';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async signin(user: CreateUserDtos) {
    // handle there signin logic
    const token = await this.generateJWTToken(user);
    return { access_token: token };
  }
  async signup(user: CreateUserDtos) {
    const newUser = await this.usersService.createUser(user);
    const token = await this.generateJWTToken(newUser);
    return { user: newUser, token };
  }

  async generateJWTToken(user: CreateUserDtos) {
    const payload = { sub: user.email, email: user.email };
    return this.jwtService.sign(payload);
  }

  async validateToken(token: string) {
    try {
      return this.jwtService.verify(token);
    } catch (error) {
      throw new Error('Invalid token');
    }
  }
}
